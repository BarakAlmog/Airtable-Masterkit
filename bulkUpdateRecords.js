// change these names to pick a view:
const table = base.getTable('Applicants')

const allRecords = await table.selectRecordsAsync({
  fields: ['Email'],
})

async function bulkUpdateRecords() {
  const updates = []

  for (const record of allRecords.records) {
    const email = record.getCellValue('Email')
    if (email) {
      updates.push({
        id: record.id,
        fields: {
          Email: email.toLowerCase(),
        },
      })
    }
  }

  if (updates.length === 0) {
    output.text('No records need updating.')
    return
  }

  output.text(`Total records to update: ${updates.length}`)

  const batchSize = 50
  let updatedCount = 0

  for (let i = 0; i < updates.length; i += batchSize) {
    const batch = updates.slice(i, i + batchSize)
    output.text(`Processing batch starting from index ${i}...`)

    try {
      await table.updateRecordsAsync(batch)
      updatedCount += batch.length
      output.text(
        `Successfully updated records from index ${i} to ${i + batch.length - 1}.`
      )
    } catch (error) {
      output.text(`An error occurred during batch starting at index ${i}: ${error}`)
    }
  }

  output.text(`Updated ${updatedCount} out of ${updates.length} records!`)
  if (updatedCount !== updates.length) {
    output.text(`Some records were not updated due to errors.`)
  }
}

// Call the async function
await bulkUpdateRecords()

/**
 * @param {number} ms
 */
function delay(ms) {
  const limit = new Date().getTime() + ms
  while (new Date().getTime() < limit) {
    // do nothing
  }
}
