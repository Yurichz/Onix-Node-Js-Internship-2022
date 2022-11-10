const invoice = {
  firstName: 'Node',
  lastName: 'Developer',
  createdAt: '2022-10-31T22:50:59.305Z',
  amount: 150,
  currency: 'USD',
};

/**
 * 1. Log firstName and lastName in dot notation and bracket notation
 */

console.log(`First name: ${invoice.firstName}`);
console.log(`Last name: ${invoice['lastName']}`);

/**
 * 2. Log Object Keys
 */

const keys = Object.keys(invoice);

console.log({
  keys,
});

/**
 * 3. Log Object values
 */

const values = Object.values(invoice);

console.log({
  values,
});

/**
 * 4. Log Object entries
 */

const entries = Object.entries(invoice);

console.log({
  entries,
});

/**
 * 5. Create second variable invoce from original
 * Please, use more than one solution
 */

const firstCopiedInvoice = JSON.parse(JSON.stringify(invoice));
const secondCopiedInvoice = {
  ...invoice,
};
const thirdCopiedInvoice = { ...invoice };

console.log({
  firstCopiedInvoice,
  secondCopiedInvoice,
  thirdCopiedInvoice,
});

/**
 * 6. Modify copiedInvoice amount value
 * Important: original invoice amount shouldnt be modified
 */

firstCopiedInvoice.amount = 100;
secondCopiedInvoice.amount = 200;
thirdCopiedInvoice.amount = 300;

console.log({
  invoice,
  firstCopiedInvoice,
  secondCopiedInvoice,
  thirdCopiedInvoice,
});

/**
 * 7. Loop through object and log key-values
 */
for (const key in invoice) console.log(`${key}: ${invoice[key]}`);
