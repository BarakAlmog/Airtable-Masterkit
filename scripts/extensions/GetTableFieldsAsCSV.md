# Get Table Fields as CSV

The script iterates over tables in a database, displaying the table's name, its fields (in CSV format), the type of each field, any special options associated with certain field types (like choices for select fields or currency options), and the views associated with each table. For each table, it generates a markdown representation of this information, which is intended to be rendered or displayed in a markdown-capable viewer.

## Script

```javascript
const tables = base.tables.map((t) => t.name)

for (let tableName of tables) {
  const fields = base.getTable(tableName).fields
  const fieldNames = fields.map((f) => f.name).join(',')
  output.markdown('# ' + tableName)
  output.markdown('#### *CSV*')
  output.text(fieldNames)
  output.markdown('#### *Types*')

  for (let field of fields) {
    // console.log(field)

    const fieldSummary = '**' + field.type + ':** ' + field.name
    output.markdown(fieldSummary)
    switch (field.type.toString()) {
      case 'singleSelect':
        choices = field.options.choices.map((c) => c.name).join(' / ')
        output.markdown('* **Choices:** ' + choices + '')
        break
      case 'multipleSelects':
        choices = field.options.choices.map((c) => c.name).join(' / ')
        output.markdown('* **Choices:** ' + choices + '')
        break
      case 'currency':
        const keys = Object.keys(field.options)
        let text = []
        for (let key of keys) {
          text += '* **' + key + '**: ' + field.options[key] + '\n'
        }
        output.markdown(text)
        break
      case 'test':
        console.log(field.options)
        break
    }
  }

  output.markdown('#### *Views*')
  const views = base.getTable(tableName).views
  for (let view of views) {
    const viewSummary = '**' + view.type + ':** ' + view.name
    output.markdown(viewSummary)
  }
}
```
