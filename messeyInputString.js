function cleanUp(messyString) {
  const cleaned = messyString
    .toLowerCase()
    .replace(/\s*;\s*/g, ";")
    .replace(/\s*=\s*/g, "=")
    .replace(/\s*,\s*/g, ",")
    .trim()
    .split(",");

  return cleaned.map((item) => {
    const [lang, q] = item.split(";");
    return { lang: lang, q: q };
  });

  //   [ 'en-GB ; q=1.0 ', '  fr;q=0.8 ', ' de ;q = 0.6' ]
}

messyString = "en-GB ; q=1.0 ,  fr;q=0.8 , de ;q = 0.6";

const result = cleanUp(messyString);

console.log(result);
