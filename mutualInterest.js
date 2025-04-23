function hasMutualInterest(user) {
  const data = {
    a: ["b", "c"],
    b: ["a", "d"],
    c: ["d", "a"],
    d: ["a", "c"],
  };

  if (!data[user]) return false;
  let usersInterests = data[user];
  for (let i = 0; i < usersInterests.length; i++) {
    if (data[usersInterests[i]]?.includes(user)) {
      return true;
    }
  }
  return false;
}

// const result = hasMutualInterest("d"); //should return true
// console.log(result);

// part 2

function hasMutualInterestByRank(user, rank) {
  const data = {
    a: ["b", "c"],
    b: ["a", "d"],
    c: ["d", "a"],
    d: ["a", "c"],
  };

  //   always include edge cases and return early
  if (!data[user]) {
    console.log("User is not in our system");

    return false;
  }
  if (rank >= data[user].length) {
    console.log("Rank is out of bounds!");
    return false;
  }

  let usersInterest = data[user][rank];
  return data[usersInterest] ? data[usersInterest][rank] === user : false;
}

const result2 = hasMutualInterestByRank("z", 10);

console.log(result2);
