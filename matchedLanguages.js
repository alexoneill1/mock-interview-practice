function getMatchedLanguages(header, supported) {
  const supportedLower = supported.map((lang) => lang.toLowerCase());

  //   parse header into objects { lang, q }
  let parsed = header.split(",").map((item) => {
    let [rawLang, qVal] = item
      .trim()
      .toLowerCase()
      .split(";q=")
      .filter((item) => item.length > 0);
    return {
      lang: rawLang,
      q: parseFloat(qVal || "1.0"),
    };
  });

  //   sort the array on the keys
  parsed.sort((a, b) => (a.q = b.q));

  console.log(parsed);

  //   create array to return
  const matched = [];

  for (const { lang } of parsed) {
    if (supportedLower.includes(lang) && !matched.includes(lang)) {
      matched.push(lang);
      continue;
    }

    // if lang does not include "-"
    if (!lang.includes("-")) {
      for (const s in supportedLower) {
        // for item in supportedLower
        if (s.startsWith(lang + "-") && !matched.includes(s)) {
          // if supportedItem.startsWitt(lang+"-") and matched does not already have supported item
          // push item to matched
          matched.push(s);
        }
      }
    }

    // language only match
  }

  return matched.map((lowerLang) => supported.find((s) => s.toLowerCase() === lowerLang));
}

const header = "en-GB, en;q=0.9, es-ES;q=0.7, fr;q=0.8";
const supported = ["en-GB", "fr", "es-ES"];

const result = getMatchedLanguages(header, supported);
console.log("result: ", result);
