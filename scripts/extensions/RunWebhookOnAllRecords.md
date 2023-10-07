# Run a Webhook on All Records

This script fetches records from the 'Contacts' table in an Airtable base. For each record, if 'Email' and 'Service Provided On Date' are not empty, a webhook request is triggered.

## How it Works

1. The script accesses the 'Contacts' table from the current Airtable base.
2. All records from the table are fetched.
3. The script retrieves the 'Email' and 'Service Provided On Date' cell values for each record.
4. If both cell values exist, a request is sent to the webhook URL.

## Script

```javascript
const WEBHOOK_URL = 'https://hook.integromat.com/123' // Replace with your own webhook URL

const table = base.getTable('Contacts')

// Asynchronously fetch all records from the 'Contacts' table
const query = await table.selectRecordsAsync()

// Loop through each record in the fetched records
for (const record of query.records) {
  const url = `${WEBHOOK_URL}?recordID=${record.id}`

  // Check if 'Email' exists, and 'Service Provided On Date' is not empty
  const email = record.getCellValue('Email')
  const serviceProvidedOnDate = record.getCellValue('Service Provided On Date')

  if (email && serviceProvidedOnDate) {
    // Send an asynchronous request to the webhook URL
    await remoteFetchAsync(url, METHOD)
  }
}
```
