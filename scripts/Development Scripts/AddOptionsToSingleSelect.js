const config = input.config({
  title: 'Update Field Options',
  description: 'A script that lets you update options of a Single Select field',
  items: [
    input.config.table('tableToUpdate', {
      label: 'Target Table',
      description:
        'Select the table where you want to update the Single Select field options',
    }),
    input.config.field('fieldToUpdate', {
      label: 'Field to Update',
      parentTable: 'tableToUpdate',
      description: 'Select the Single Select field you want to update',
    }),
    input.config.text('newOptions', {
      label: 'Options',
      description: 'Enter the options separated by commas',
    }),
  ],
})

// Extracting the configurations into constants for easier access
const table = config.tableToUpdate
const field = config.fieldToUpdate
const optionsString = config.newOptions
const optionsArr = optionsString
  .split(',')
  .map((option) => option.trim())
  .filter((option) => option != '')

// Check if it's a single select field
if (field.type !== 'singleSelect') {
  output.text('The provided field is not a Single Select field.')
  return
}

// Get current field options
const currentOptions = field.options.choices.map((choice) => choice.name)

// Add new options that aren't already in the list
for (let option of optionsArr) {
  if (!currentOptions.includes(option)) {
    currentOptions.push(option)
  }
}

// Update the Single Select field with the new options
await field.updateOptionsAsync(
  {
    choices: currentOptions.map((option) => ({ name: option })),
  },
  {
    enableSelectFieldChoiceDeletion: true,
  }
)

output.text('Options added successfully!')
