function findBackToBackRefunds(transactions) {
  let results = [];
  let previousChargeType = null;

  for (let i = 0; i < transactions.length; i++) {
    let current = transactions[i];
    if (current["type"] === "refund" && previousChargeType === "refund") {
      results.push(current["id"]);
    }
    previousChargeType = current["type"];
  }
  return results;
}

const transactions = [
  { id: "t1", type: "charge" },
  { id: "t2", type: "refund" },
  { id: "t3", type: "refund" },
  { id: "t4", type: "refund" },
  { id: "t5", type: "charge" },
  { id: "t6", type: "refund" },
  { id: "t7", type: "refund" },
];

// const results = findBackToBackRefunds(transactions);
// console.log("results: ", results);

function testFindBackToBackRefunds(input, expected, message) {
  const output = findBackToBackRefunds(input);
  const pass = JSON.stringify(output) === JSON.stringify(expected);
  console.log(input, expected);
  if (pass) {
    console.log(`${message}. Test is successul`);
  } else {
    console.log(`${message}. Test has failed`);
  }
}

testFindBackToBackRefunds([], [], "empty array → returns empty");

testFindBackToBackRefunds([{ id: "t1", type: "refund" }], [], "single refund → no back-to-back");

testFindBackToBackRefunds(
  [
    { id: "t1", type: "refund" },
    { id: "t2", type: "refund" },
  ],
  ["t2"],
  "two refunds in a row → second one returned"
);

testFindBackToBackRefunds(
  [
    { id: "t1", type: "charge" },
    { id: "t2", type: "refund" },
    { id: "t3", type: "refund" },
    { id: "t4", type: "refund" },
    { id: "t5", type: "charge" },
    { id: "t6", type: "refund" },
    { id: "t7", type: "refund" },
  ],
  ["t3", "t4", "t7"],
  "mixed transactions → detects multiple refund streaks"
);

testFindBackToBackRefunds(
  [
    { id: "t1", type: "refund" },
    { id: "t2", type: "charge" },
    { id: "t3", type: "refund" },
  ],
  [],
  "refunds separated by charges → no back-to-back refunds"
);
