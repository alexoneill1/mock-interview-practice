function mergeIntervals(intervals) {
  // currentStart = current[0]
  // keep going until current[1] < next[0]
  // currentEnd = current[1]
  // increment currentEnd until currentStart > currentEnd
  let currentStart = intervals[0][0];
  let currentEnd = intervals[0][1];
  let results = [];

  intervals.sort((a, b) => a[0] - b[0]);

  for (const interval of intervals) {
    console.log(interval);
    const [start, end] = interval;
    if (currentEnd > start) {
      if (end > currentEnd) {
        currentEnd = end;
      }
    } else {
      results.push([currentStart, currentEnd]);
      currentStart = start;
      currentEnd = end;
      console.log(currentStart, currentEnd);
    }
  }
  results.push([currentStart, currentEnd]);
  return results;
}

let intervals = [
  [1, 5],
  [3, 6],
  [8, 10],
  [9, 12],
];

console.log(mergeIntervals(intervals));
