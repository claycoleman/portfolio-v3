import cssParser from "css";

//
// Transform implementation or originally thanks to
// https://github.com/raphamorim/native-css
//

function transformRules(self, rules, result) {
  rules.forEach(function(rule) {
    const obj = {};
    if (rule.type === "media") {
      const name = mediaNameGenerator(rule.media);
      const media = (result[name] = result[name] || {
        __expression__: rule.media,
      });
      transformRules(self, rule.rules, media);
    } else if (rule.type === "rule") {
      rule.declarations.forEach(function(declaration) {
        if (declaration.type === "declaration") {
          const cleanProperty = cleanPropertyName(declaration.property);
          obj[cleanProperty] = declaration.value;
        }
      });
      rule.selectors.forEach(function(selector) {
        const name = nameGenerator(selector.trim());
        result[name] = obj;
      });
    }
  });
}

const cleanPropertyName = function(name) {
  // turn things like 'align-items' into 'alignItems'
  name = name.replace(/(-.)/g, function(v) {
    return v[1].toUpperCase();
  });

  return name;
};

const mediaNameGenerator = function(name) {
  return "@media " + name;
};

const nameGenerator = function(name) {
  name = name.replace(/\s\s+/g, " ");
  name = name.replace(/[^a-zA-Z0-9]/g, "_");
  name = name.replace(/^_+/g, "");
  name = name.replace(/_+$/g, "");

  return name;
};

function traverseAndReplacePXWithNumbers(x, parentObject = null, keyInParentObject = null) {
  if (Array.isArray(x)) {
    traverseArray(x);
  } else if (typeof x === "object" && x !== null) {
    traverseObject(x);
  } else {
    if (typeof x === "string" && x.match(/\d+px/g)) {
      parentObject[keyInParentObject] = Number(x.replace("px", ""));
    }
  }
  return x
}

function traverseArray(arr) {
  arr.forEach(function(x) {
    traverseAndReplacePXWithNumbers(x);
  });
}

function traverseObject(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      traverseAndReplacePXWithNumbers(obj[key], obj, key);
    }
  }
}

export default function transformCss(inputCssText) {
  if (!inputCssText) {
    throw new Error("missing css text to transform");
  }

  // If the input "css" doesn't wrap it with a css class (raw styles)
  // we need to wrap it with a style so the css parser doesn't choke.
  let bootstrapWithCssClass = false;
  if (inputCssText.indexOf("{") === -1) {
    bootstrapWithCssClass = true;
    inputCssText = `.bootstrapWithCssClass { ${inputCssText} }`;
  }

  const css = cssParser.parse(inputCssText);
  let result = {};
  transformRules(this, css.stylesheet.rules, result);

  // Don't expose the implementation detail of our wrapped css class.
  if (bootstrapWithCssClass) {
    result = result.bootstrapWithCssClass;
  }

  return traverseAndReplacePXWithNumbers(result);
}
