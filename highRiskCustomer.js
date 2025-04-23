function findHighRiskCustomers(transactions) {
  let findHighRiskCustomers = [];
  let totalTransactionsMap = new Map();
  let totalRefundsMap = new Map();
  let userList = [];

  for (let i = 0; i < transactions.length; i++) {
    let current = transactions[i];
    // if current['customerId'] in totalTransactionsMap, add 1
    if (totalTransactionsMap.has(current["customerId"])) {
      totalTransactionsMap.set(
        current["customerId"],
        totalTransactionsMap.get(current["customerId"]) + 1
      );
    }
    // else add current['customerId'] = 1
    else {
      totalTransactionsMap.set(current["customerId"], 1);
    }

    //all looks good here
    // console.log(totalTransactionsMap);

    // if(current["type"] === "refund")
    console.log(current);
    if (current["type"] === "refund") {
      console.log('current["cusomterId"]: ', current["customerId"]);
      if (totalRefundsMap.has(current["customerId"])) {
        console.log("has customerId");
        totalRefundsMap.set(current["customerId"], totalRefundsMap.get(current["customerId"]) + 1);
      } else {
        totalRefundsMap.set(current["customerId"], 1);
      }
    }
    // if current['customerId'] in totalRefundsMap, add 1
    console.log(totalRefundsMap);
    // else add current['customerId'] = 1

    // if current['customerId'] not in userList -> add to userList
    if (!userList.includes(current["customerId"])) {
      userList.push(current["customerId"]);
    }

    console.log("userList: ", userList);
  }

  // for each customer in userList
  for (let i = 0; i < userList.length; i++) {
    let user = userList[i];
    console.log("user: ", user);
    // if(totalTransactionsMap.has(user) and totalTransactionsMap.get(user) > 1)
    if (totalTransactionsMap.has(user) && totalTransactionsMap.get(user) > 1) {
      let total = totalTransactionsMap.get(user);
      console.log("total for user", user, total);
      // if(totalRefundsMap.has(user))
      if (totalRefundsMap.has(user)) {
        let refundedCount = totalRefundsMap.get(user);

        console.log("refunds for user", user, refundedCount);

        console.log(refundedCount > total * 0.5);

        if (refundedCount > total * 0.5) {
          // if refundedCount > total * 0.5
          console.log(user);
          console.log(findHighRiskCustomers);
          findHighRiskCustomers.push(user);
          // findHighRiskCustomers.push(user)
        }
      }
    }
  }

  return findHighRiskCustomers;
}

const transactions = [
  { customerId: "u1", type: "charge" },
  { customerId: "u2", type: "charge" },
  { customerId: "u1", type: "refund" },
  { customerId: "u1", type: "refund" },
  { customerId: "u2", type: "refund" },
  { customerId: "u3", type: "charge" },
  { customerId: "u3", type: "refund" },
];

console.log(findHighRiskCustomers(transactions));
