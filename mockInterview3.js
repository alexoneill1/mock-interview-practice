function findFirstFailingWindow(events, windowSize, failureThreshold) {
  let failureCount = 0;
  let window = [];

  if (events.length === 0) return -1;
  if (events.length < windowSize) return -1;

  for (let i = 0; i < events.length; i++) {
    let event = events[i];
    if (window.length === windowSize) {
      // check if failureCount / windowSize > failureThreshold
      // if it is, return window[0]
      // remove the first element
      let status = window.shift();
      if (status === "failed") {
        failureCount = failureCount - 1;
      }

      if (failureCount / windowSize > failureThreshold) {
        return i - windowSize;
      }
    }
    // window.push
    window.push(event);
    if (event === "failed") {
      failureCount++;
    }
  }
  return -1;
}

const result = findFirstFailingWindow(
  ["ok", "ok", "failed", "failed", "ok", "failed", "failed"],
  3,
  0.66
);

console.log(result);
