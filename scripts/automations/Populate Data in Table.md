# Get Table Fields as CSV

The script retrieves a specific expense record from the "Expenses" table, identifies another expense from the same supplier as a reference, and then updates the original expense's details (like Type, Total, Purpose, and Category) to match those of the reference expense. Essentially, it synchronizes the details of an expense with another similar expense from the same supplier.

### Automation Setup

_Trigger_: When a record matches conditions

- Supplier: is not empty
- And: Date: is not empty
- And: Category: is empty
- And: Total: is empty
- And: Purpose: is empty

_Action_: Run script

## Script

```javascript
// Retrieve a specific table named "Expenses" from the base (database).
const table = base.getTable('Expenses')

// Fetch the record ID from the input configuration (probably provided by a user or some interface).
const expenseID = input.config().recordID
// Asynchronously fetch the specific expense record using its ID.
const expense = await table.selectRecordAsync(expenseID)

// Extract the supplier name from the fetched expense record.
const supplier = expense.getCellValueAsString('Supplier')
// Log the supplier name for debugging or informational purposes.
console.log(supplier)

// Asynchronously fetch all the records from the "Expenses" table.
const allExpenses = await table.selectRecordsAsync()

// Filter out expenses related to the same supplier but exclude the current expense.
const allSupplierExpenses = allExpenses.records.filter(
  (expense) =>
    expense.getCellValueAsString('Supplier') === supplier && expense.id !== expenseID
)

// Select the first expense (reference expense) from the filtered list.
const refExpense = allSupplierExpenses[0]

// Extract various details like Type, Total, Purpose, and Category from the reference expense.
const type = refExpense.getCellValue('Type')
const total = refExpense.getCellValue('Total')
const purpose = refExpense.getCellValue('Purpose')
const category = refExpense.getCellValue('Category')

// Asynchronously update the original expense record with details fetched from the reference expense.
await table.updateRecordAsync(expenseID, {
  Total: total,
  Type: type,
  Purpose: purpose,
  Category: category,
})
```
