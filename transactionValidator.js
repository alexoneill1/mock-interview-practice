function validateTransactionTotal(response) {
  // if sum of all amount matches the total, return true
  // return false otherwise
  // multiply by 100 and then add
  // divide by 100

  if (response.transactions.length === 0) return false;

  let totalInCents = 0;

  for (const item of response.transactions) {
    console.log(item);
    // use the item.amount, in its cent for and add it to total in cents
    totalInCents += parseFloat(item.amount) * 100;
  }
  //   return true if response.total === totalInCents / 100 .toFixed(2)
  return response.total === (totalInCents / 100).toFixed(2);
}

const response = {
  user: "alex.oneill",
  transactions: [
    { id: "t1", amount: "42.50", currency: "USD" },
    { id: "t2", amount: "20", currency: "USD" },
    { id: "t3", amount: "13.99", currency: "USD" },
  ],
  total: "75.49",
};

console.log(validateTransactionTotal(response));
