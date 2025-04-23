function flattenCategories(categories) {
  let flattenedResults = [];

  function recurse(list, path) {
    for (const item of list) {
      const { id, label, children } = item;
      const newPath = path.concat(id);
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
