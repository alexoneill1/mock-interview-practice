function validateAmount(amountString) {
  const amount = parseFloat(amountString);
  console.log(amount);
  if (!amount) return false;
  return amount > 0;
}
console.log(validateAmount("-5")); // should be false — what does it return?
console.log(validateAmount("notanumber")); // should be false — what does it return?
