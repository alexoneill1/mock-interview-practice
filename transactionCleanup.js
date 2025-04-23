function normalizeTransactions(transactions, acceptedCurrencies) {
  if (transactions.length === 0) return "no transactions to parse!";

  transactionsNormalised = transactions.map((item) => {
    let cleanedString = item
      .toLowerCase()
      .trim()
      .replace(/\s*:\s*/g, ":")
      .replace(/\s*,\s*/g, ",");

    const result = {};
    const objectMapping = cleanedString.split(",");

    objectMapping.forEach((pair) => {
      const [key, value] = pair.split(":");
      if (key === "currency" && acceptedCurrencies.includes(value.toUpperCase())) {
        result[key] = value.toUpperCase();
      } else {
        result[key] = value;
      }

      if (key === "amount" && parseFloat(value) < 0) {
        console.log("Warning: Negative Amount Detected!");
      }
    });

    return result;
  });
  return transactionsNormalised;
}

const transactions = [
  " ID: 001 , amount : 42.50 , currency : usd ",
  " ID: 002 , amount : 13.90 , currency : USD ",
  " ID: 003 , amount: 50, currency: Eur",
];

console.log(normalizeTransactions(transactions, ["USD", "EUR", "GBP"]));
