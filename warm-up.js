function normalizeLanguages(input) {
  let normaliseString = input.trim().toLowerCase().replace(/\s/g, "").split(",");
  console.log("normaliseString: ", normaliseString);
}

function normalizeLanguagesWithMaps(input) {
  return input
    .split(",")
    .map((element) => element.trim().toLowerCase())
    .filter((item) => item.length > 0);
}

const inputString = " En-GB ,  FR, es-ES ";
console.log(normalizeLanguagesWithMaps("Fr-CA,  en ,Es"));

// output: ["en-gb", "fr", "es-es"]
