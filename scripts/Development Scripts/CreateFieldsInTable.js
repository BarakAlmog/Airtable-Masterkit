const config = input.config({
  title: 'Create Fields in Table',
  description: 'A script that creates a set of fields in a table',
  items: [
    input.config.table('tableToUpdate', {
      label: 'Target Table',
      description:
        'Select the table where you want to update the Single Select field options',
    }),
    input.config.text('newFieldsNames', {
      label: 'Field Names',
      description: 'Enter the field names separated by commas',
    }),
  ],
})

// Extracting the configurations into constants for easier access
const table = config.tableToUpdate
const fieldsString = config.newFieldsNames
const fieldNamesArr = fieldsString
  .split(',')
  .map((fieldName) => fieldName.trim())
  .filter((fieldName) => fieldName != '')

for (const fieldName of fieldNamesArr) {
  try {
    await table.createFieldAsync(fieldName, 'singleLineText')
  } catch (error) {
    output.text(`Error creating field "${fieldName}": ${error.message}`)
    return
  }
}

output.text('Fields created successfully!')
