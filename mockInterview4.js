function findDuplicatePayouts(payouts) {
  let duplicates = [];
  let userToPayoutMap = new Map();

  //two or more payouts that
  // belong to the same user
  // same amount
  // occur within a 5 minute window (timestamp difference is <= 300)

  // use a window to track if the last item was more than 300 seconds ago?
  for (const payout of payouts) {
    const { id, userId, amount, timestamp } = payout;
    // create a window for each user
    // if window already exists, add to it
    if (userToPayoutMap.has(userId)) {
      let usersWindow = userToPayoutMap.get(userId);
      // remove all elements from the window that are less than timestamp - 3000
      // then check what elements are left
      // the remainder are duplicates
      for (let element of usersWindow) {
        let [id, ts] = element;
        if (ts < timestamp - 300) {
          duplicates.push(id);
        }
      }
      userToPayoutMap.set(usersWindow, usersWindow.push([id, timestamp]));
    }
    // else, create it
    else {
      userToPayoutMap.set(userId, [[id, timestamp]]);
    }
    // store it in a map (user: [[id, timestamp]])
    // [[p1, 1680000000], [p3, 1680000200]]
    // remove all elements from the window that are less than timestamp - 3000
    // then check what elements are left
    // the remainder are duplicates
  }

  return userToPayoutMap;
}

const payouts = [
  { id: "p1", userId: "u1", amount: "100.00", timestamp: 1680000000 },
  { id: "p2", userId: "u2", amount: "25.00", timestamp: 1680000050 },
  { id: "p3", userId: "u1", amount: "100.00", timestamp: 1680000200 },
  { id: "p4", userId: "u1", amount: "100.00", timestamp: 1680000300 },
  { id: "p5", userId: "u1", amount: "50.00", timestamp: 1680000400 },
  { id: "p6", userId: "u2", amount: "25.00", timestamp: 1680000600 },
];

console.log(findDuplicatePayouts(payouts));
