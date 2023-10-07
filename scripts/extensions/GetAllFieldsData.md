# Get All Fields Data

This script fetches all fields from all tables in an Airtable base. The data is stored in a new table called 'Field IDs'.

## How it Works

1. The script accesses the current Airtable base.
2. All tables from the base are fetched.
3. For each table, all fields are fetched.
4. The script creates a new table called 'Field IDs' if it doesn't exist.
5. For each field, a record is created in the 'Field IDs' table.
6. The record contains the following fields:
   - ID: A unique identifier for the record
   - Base Name: The name of the base
   - Table Name: The name of the table
   - Field Name: The name of the field
   - Airtable Type: The type of the field
   - Field ID: The ID of the field

## Script

```javascript
const tables = base.tables.map((t) => t.name)
if (!tables.includes('Field IDs')) {
  const tableId = await base.createTableAsync('Field IDs', [
    { name: 'ID', type: 'singleLineText' },
    { name: 'Base Name', type: 'singleLineText' },
    { name: 'Table Name', type: 'singleLineText' },
    { name: 'Field Name', type: 'singleLineText' },
    { name: 'Airtable Type', type: 'singleLineText' },
    { name: 'Field ID', type: 'singleLineText' },
  ])
}

// change these names to pick a view:
const mapTable = base.getTable('Field IDs')

for (let tableName of tables) {
  const fields = base.getTable(tableName).fields
  for (let field of fields) {
    let recordId = await mapTable.createRecordAsync({
      ID: '{Table Name} & " :: " & {Field Name}',
      'Base Name': base.name,
      'Table Name': tableName,
      'Field Name': field.name,
      'Airtable Type': field.type,
      'Field ID': field.id,
    })
  }
}
```
