// Change this name to use a different table
let table = base.getTable('TABLE_NAME')

// Prompt the user to pick a record
// If this script is run from a button field, this will use the button's record instead.
let record = await input.recordAsync('Pick a record', table)

// Change this name to use a different field
let value = record.getCellValue('VALUE_FIELD_NAME')

// Adding 1 (change field name too)
await table.updateRecordAsync(record, { VALUE_FIELD_NAME: value + 1 })
