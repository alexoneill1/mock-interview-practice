function validateTransactionTotal(response) {
  let transactions = response["transactions"];
  let total = parseFloat(response["total"]);

  let totalFromTransaction = 0;
  for (let i = 0; i < transactions.length; i++) {
    totalFromTransaction += parseFloat(transactions[i]["amount"]);
  }
  return totalFromTransaction.toFixed(2) === total;
}

let response = {
  user: "alex.oneill",
  transactions: [
    { id: "t1", amount: "42.50", currency: "USD" },
    { id: "t2", amount: "20", currency: "USD" },
    { id: "t3", amount: "13.99", currency: "USD" },
  ],
  total: "75.49",
};

const result = validateTransactionTotal(response);
console.log(result);
