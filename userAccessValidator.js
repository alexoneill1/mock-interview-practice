function getUserAccessMap(data) {
  let mappings = {};
  const users = data["users"];
  const teamsArray = data["teams"];
  const workspaces = data["workspaces"];

  for (let user of users) {
    let userWorkspaceAccess = new Set();

    // teams = user['teams']
    // then we want to get their workspaces from teams and workspaces
    // for item in teams
    // if teams workspaces is not empty, add this array to the set
    // now check the workspaces
    // for item in workspaces, if workspace['memebers'] includes user, add workspace['id'] to set

    const teams = user["teams"];
    for (const team of teamsArray) {
      if (teams.includes(team.id)) {
        team["workspaces"].map((item) => userWorkspaceAccess.add(item));
      }
    }

    for (let item of workspaces) {
      if (item["members"]?.includes(user.id)) {
        userWorkspaceAccess.add(item.id);
      }
    }

    mappings[user.id] = Array.from(userWorkspaceAccess);
  }

  return mappings;
}

const data = {
  users: [
    { id: "u1", teams: ["t1"] },
    { id: "u2", teams: [] },
    { id: "u3", teams: ["t2", "t3"] },
  ],
  teams: [
    { id: "t1", workspaces: ["w1"] },
    { id: "t2", workspaces: ["w1", "w2"] },
    { id: "t3", workspaces: ["w3"] },
  ],
  workspaces: [
    { id: "w1", members: ["u2"] }, // direct access
    { id: "w2", members: [] },
    { id: "w3", members: [] },
  ],
};

console.log(getUserAccessMap(data));
