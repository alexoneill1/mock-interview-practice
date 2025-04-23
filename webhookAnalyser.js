function summarizeDeliveries(events) {
  let results = {};
  for (let i = 0; i < events.length; i++) {
    let currentEvent = events[i];

    // if the item already exists, increment the values
    if (results[currentEvent["endpoint"]]) {
      results[currentEvent["endpoint"]]["total"] = results[currentEvent["endpoint"]]["total"] + 1;
      if (currentEvent["status"] === "ok") {
        results[currentEvent["endpoint"]]["success"] =
          results[currentEvent["endpoint"]]["success"] + 1;
      } else {
        results[currentEvent["endpoint"]]["failed"] =
          results[currentEvent["endpoint"]]["failed"] + 1;
      }
    } else {
      results[currentEvent["endpoint"]] = {
        total: 1,
        failed: currentEvent["status"] === "failed" ? 1 : 0,
        success: currentEvent["status"] === "ok" ? 1 : 0,
      };
    }
  }

  return results;
}

function findUnstableEndpoints(summary, threshold) {
  //look at each item in summary
  // if the items failure value devided by the total value is greater than the failure threshold, add the item to the array

  let allUnstableEndpoint = [];

  for (const [endpoint, stats] of Object.entries(summary)) {
    const { failed, total } = stats;
    if (failed / total > threshold) {
      allUnstableEndpoint.push(endpoint);
    }
    // if(summary[item]['tota']
  }
  return allUnstableEndpoint;
}

const events = [
  { id: "evt_1", endpoint: "https://a.com/hook", status: "ok", timestamp: 1670000100 },
  { id: "evt_2", endpoint: "https://a.com/hook", status: "failed", timestamp: 1670000110 },
  { id: "evt_3", endpoint: "https://b.com/hook", status: "ok", timestamp: 1670000120 },
  { id: "evt_4", endpoint: "https://a.com/hook", status: "ok", timestamp: 1670000130 },
  { id: "evt_5", endpoint: "https://b.com/hook", status: "failed", timestamp: 1670000140 },
  { id: "evt_6", endpoint: "https://b.com/hook", status: "failed", timestamp: 1670000150 },
  { id: "evt_7", endpoint: "https://c.com/hook", status: "ok", timestamp: 1670000160 },
];

const summary = summarizeDeliveries(events);

const threshold = 0.5;

const unstableEndpoints = findUnstableEndpoints(summary, threshold);

function detectRateLimitViolations(events, maxPerMinute) {
  let window = [];
  let violations = [];

  for (let item of events) {
    let { endpoint, timestamp } = item;

    if (window.length === maxPerMinute) {
      if (window[0] < timestamp - 59) {
        violations.push(endpoint);
        window.shift();
      }
    } else {
      window.push(timestamp);
    }
  }
  return violations;
}

const rateLimitEvents = [
  { endpoint: "a.com", timestamp: 1 },
  { endpoint: "a.com", timestamp: 5 },
  { endpoint: "b.com", timestamp: 58 },
  { endpoint: "a.com", timestamp: 61 },
  { endpoint: "b.com", timestamp: 90 },
  { endpoint: "b.com", timestamp: 92 },
  { endpoint: "a.com", timestamp: 94 },
  { endpoint: "b.com", timestamp: 102 },
];

let maxPerMinute = 2;

console.log(detectRateLimitViolations(rateLimitEvents, maxPerMinute));
