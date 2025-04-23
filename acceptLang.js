function getMatchedLanguages(header, supported) {
  let supportedLanguagesInOrder = new Set();

  let listOfObjectMappings = header
    .toLowerCase()
    .trim()
    .replace(/\s*;\s*/g, ";")
    .replace(/\s*=\s*/g, "=")
    .replace(/\s*,\s*/g, ",")
    .split(",")
    .map((item) => {
      let [lang, q] = item.split(";q=");
      return { lang: lang, q: q || "1.0" };
    });

  // now we sort
  const sortedMappings = listOfObjectMappings.sort((a, b) => b.q - a.q);

  for (let i = 0; i < sortedMappings.length; i++) {
    let currentMapping = sortedMappings[i];

    console.log(currentMapping);

    if (!currentMapping["lang"].includes("-")) {
      for (const s of supported) {
        console.log(s);
        // if s.startsWith s + "-" and s is not already in supportedLanguagesInOrder
        // add it
        if (s.startsWith(currentMapping["lang"] + "-") && !supportedLanguagesInOrder.has(s)) {
          supportedLanguagesInOrder.add(s);
        } else {
          const exactMatch = supported.find((s) => s.toLowerCase() === currentMapping["lang"]);
          console.log(exactMatch);
          if (exactMatch && !supportedLanguagesInOrder.has(exactMatch)) {
            supportedLanguagesInOrder.add(exactMatch);
          }
        }
      }
    }
  }
  console.log(supportedLanguagesInOrder);
}

const header = " En-GB ; q=1.0 , EN ;q=0.9 , de;q = 0.8, fr ";
const supported = ["en-GB", "de-DE", "fr", "en-US"];

console.log(getMatchedLanguages(header, supported));
