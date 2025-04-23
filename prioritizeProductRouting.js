function routeTicket(description, rules) {
  // if description contains string of words
  // rules contains team and keywords
  // goal is to ensure that the string with the most keywords is returned
  // if its a tie, return the first in the array
  // if more than one matched, return the one with the highest score

  // 1. split the string on spaces, so we have a tokenised array
  // 2. create a map of all keywords: team
  // 3. for each word in description, check if map has word. If true, incremement team count, else create map key
  // 4. check which team has highest count
  // 5. return first in array if tie
  // 6. return unassigned if no matches

  const words = description.toLowerCase().split(" ");

  const keywordsToTeamMap = new Map();
  const teamMatches = new Map();

  for (const rule of rules) {
    const { team, keywords } = rule;

    // map each keyword to team
    keywords.map((keyword) => keywordsToTeamMap.set(keyword.toLowerCase(), team));
  }

  for (const word of words) {
    if (keywordsToTeamMap.has(word)) {
      const team = keywordsToTeamMap.get(word);
      if (teamMatches.has(team)) {
        teamMatches.set(team, teamMatches.get(team) + 1);
      } else {
        // create team index
        teamMatches.set(team, 1);
      }
    }
  }

  //if map.size === 1 - return that item,
  //if it is > 1, return the first item
  // if there are no matches, return unassigned

  let bestTeam = "unassigned";
  let bestScore = 0;
  for (const rule of rules) {
    const score = teamMatches.get(rule.team) || 0;
    if (score > bestScore) {
      bestTeam = rule.team;
      bestScore = score;
    }
  }

  return bestTeam ? bestTeam : "unassigned";
}

let rules = [
  { team: "billing", keywords: ["invoice", "charge", "payment"] },
  { team: "auth", keywords: ["Login", "password", "reset"] },
  { team: "accounts", keywords: ["email", "account", "profile"] },
];

let description = "I can't login or reset my password";

console.log(routeTicket(description, rules));

function runTestSuite(rules, arrayOfTests) {
  for (const { input, output } of arrayOfTests) {
    console.log(`Test for "${input}": `, routeTicket(input, rules) === output);
  }
  return "Tests complete";
}

const arrayOfTests = [
  {
    input: "My invoice payment failed",
    output: "billing",
  },
  {
    input: "How do I reset my password or login?",
    output: "auth",
  },
];

const testSuite = runTestSuite(rules, arrayOfTests);
console.log(testSuite);
