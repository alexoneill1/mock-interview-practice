function sumAmounts(amounts) {
  let amountInCents = amounts.reduce((sum, amt) => {
    return sum + Math.round(parseFloat(amt) * 100);
  }, 0);

  return (amountInCents / 100).toFixed(2);
}

console.log(sumAmounts(["10.25", "20", "5.5"])); // ??
console.log(sumAmounts(["0.1", "0.2"])); // ??
