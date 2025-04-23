function findFirstDuplicate(numbersArr) {
  console.log(numbersArr);
  let seenSoFar = new Set();
  for (const num of numbersArr) {
    // has is o(1)
    if (seenSoFar.has(num)) return num;
    seenSoFar.add(num);
  }
  return null;
}

const result = findFirstDuplicate([1, 2, 3, 4]);

console.log(result);
