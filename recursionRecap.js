function flattenCategories(categories) {
  // for item in items
  // add to the flattenedCategories
  // if children exist, call flattenCategories with the children

  let flattenedResults = [];

  // 1. create recurse function that takes in an array
  // 2. loop through that array
  // 3. push the current item to the array
  // 4. if the current item has a filed we would like to reform the same action on, call the same function again with a smaller piece of data
  // 5. when complete, return the flattened results

  function recurse(list, path) {
    for (let item of list) {
      console.log(item);
      let { id, label, children } = item;
      let newPath = path.concat(id);
      flattenedResults.push({ id, label, path: newPath });
      if (children && children.length > 0) {
        recurse(children, newPath);
      }
    }
  }

  recurse(categories, []);

  return flattenedResults;
}

const categories = [
  {
    id: "payments",
    label: "Payments",
    children: [
      {
        id: "refunds",
        label: "Refunds",
        children: [
          { id: "partial", label: "Partial Refunds", children: [] },
          { id: "full", label: "Full Refunds", children: [] },
        ],
      },
    ],
  },
  {
    id: "accounts",
    label: "Accounts",
    children: [],
  },
];

console.log(flattenCategories(categories));
