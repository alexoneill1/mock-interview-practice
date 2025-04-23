function addCurrencyStrings(a, b) {
  let total = 0;

  let firstNumInCents = Math.round(parseFloat(a) * 100);
  let secondNumInCents = Math.round(parseFloat(b) * 100);

  total = firstNumInCents + secondNumInCents;
  return (total / 100).toFixed(2);
}

// const result = addCurrencyStrings("99.999", "0.001");

// console.log(result);

function sumCurrencyArray(amounts, currency) {
  if (amounts.length === 0) return "0.00";
  if (amounts.length === 1) return parseFloat(amounts[0]).toFixed(2);
  // amounts is like: ["1.20", "2.30", "0.50"]
  // return total as a string like: "4.00"
  let total = 0;
  for (let i = 0; i < amounts.length; i++) {
    total += Math.round(parseFloat(amounts[i]) * 100);
  }
  return currency === "USD" ? "$" + (total / 100).toFixed(2) : "€" + (total / 100).toFixed(2);
}

console.log(sumCurrencyArray(["1.20", "2.30", "0.50"], "USD"));
