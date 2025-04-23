function parseAndSortLanguages(header) {
  let langCodeByQuality = [];

  let normaliseString = header.toLowerCase().split(",");
  //now an array of pairs as atring still

  let languageObjects = normaliseString.map((item) => {
    let [lang, q] = item.trim().split(";q=");
    return { lang: lang, q: q || "1.0" };
  });

  let sortedLanguages = languageObjects.sort((a, b) => parseFloat(b.q) - parseFloat(a.q));

  for (let item in sortedLanguages) {
    langCodeByQuality.push(sortedLanguages[item]["lang"]);
  }
  return langCodeByQuality;
}

let header = "es-MX;q=0.8, en;q=0.9, fr;q=1.0, de";

console.log(parseAndSortLanguages(header));
