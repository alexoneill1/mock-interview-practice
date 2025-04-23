function rateLimit(timestamps, limitPerMinute) {
  let resultsArray = [];
  let window = [];

  for (let i = 0; i < timestamps.length; i++) {
    let current = timestamps[i];
    // remove old timestamps from outside the the window
    while (window.length > 0 && window[0] < current - 59) {
      window.shift();
    }

    // check current number of items in the queue
    if (window.length < limitPerMinute) {
      resultsArray.push(true);
      window.push(current);
    } else {
      resultsArray.push(false);
    }
  }
  return resultsArray;
}

console.log(rateLimit([1, 5, 58, 61, 62], 2));
