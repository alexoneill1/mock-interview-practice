function findFlakyEndpoints(deliveries, failureThreshold) {
  let flakyEndpoints = [];
  let totalDeliveriesPerEndpoint = new Map();
  let failuresPerEndpoint = new Map();
  let endpointsList = [];

  for (let i = 0; i < deliveries.length; i++) {
    const current = deliveries[i];
    // check if current[endpoint] is in totalDeliveriesPerEndpoint
    // if it is, incremenet it by one
    // else initialise it to one
    if (totalDeliveriesPerEndpoint.has(current["endpoint"])) {
      totalDeliveriesPerEndpoint.set(
        current["endpoint"],
        totalDeliveriesPerEndpoint.get(current["endpoint"]) + 1
      );
    } else {
      totalDeliveriesPerEndpoint.set(current["endpoint"], 1);
      endpointsList.push(current["endpoint"]);
    }

    // check if current[endpoint] is in failuresPerEndpoint
    // if it is, incremenet it by one
    // else initialise it to one
    if (current["status"] === "failed") {
      if (failuresPerEndpoint.has(current["endpoint"])) {
        failuresPerEndpoint.set(
          current["endpoint"],
          failuresPerEndpoint.get(current["endpoint"]) + 1
        );
      } else {
        failuresPerEndpoint.set(current["endpoint"], 1);
      }
    }
  }

  endpointsList.forEach((endpoint) => {
    if (failuresPerEndpoint.has(endpoint)) {
      let total = totalDeliveriesPerEndpoint.get(endpoint);
      let numOfFailures = failuresPerEndpoint.get(endpoint);
      if (numOfFailures > total * failureThreshold) {
        flakyEndpoints.push(endpoint);
      }
    }
  });

  return flakyEndpoints;
}

const deliveries = [
  { endpoint: "https://a.com/hook", status: "ok" },
  { endpoint: "https://b.com/hook", status: "failed" },
  { endpoint: "https://a.com/hook", status: "failed" },
  { endpoint: "https://b.com/hook", status: "failed" },
  { endpoint: "https://c.com/hook", status: "ok" },
  { endpoint: "https://b.com/hook", status: "ok" },
  { endpoint: "https://c.com/hook", status: "ok" },
  { endpoint: "https://c.com/hook", status: "ok" },
];

const failureThreshold = 0;

const result = findFlakyEndpoints(deliveries, failureThreshold);

console.log(result);
