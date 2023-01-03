import { ajvLocalize } from "common-localization";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { IValidateSchemaProps } from "global/interfaces";
import toPath from "lodash/toPath";

export function createAjvInstance() {
  const ajvObject = new Ajv({
    allErrors: true,
    multipleOfPrecision: 8,
  });

  ajvObject.addKeyword("enumNames");
  addFormats(ajvObject);
  // add custom formats
  ajvObject.addFormat("data-url", /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/);
  ajvObject.addFormat(
    "color",
    /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/
  );
  return ajvObject;
}

function cleanEmptyProperties(obj: any) {
  var propNames = Object.getOwnPropertyNames(obj);
  for (var i = 0; i < propNames.length; i++) {
    var propName = propNames[i];
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
      delete obj[propName];
    }
  }
}

export const validateSchema = ({ data, schema, ajvObject, onValidateErrors }: IValidateSchemaProps) => {
  let validationError = null;
  try {
    cleanEmptyProperties(data);
    ajvObject.validate(schema, data);
    let errors = transformAjvErrors(ajvObject.errors);

    console.log("transformAjvErrors-ajv.jsonSchema: ", schema);
    console.log("transformAjvErrors-ajv.errors: ", ajvObject.errors);
    console.log("transformAjvErrors: ", errors);

    let errorSchema = toErrorSchema(errors);
    onValidateErrors(errorSchema);
    console.log("errorSchema: ", errorSchema);

    return errorSchema;
  } catch (err) {
    validationError = err;
    console.log("validateSchema: ", validationError);
  }
};

export function toErrorSchema(errors: any) {
  // Transforms a ajv validation errors list:
  // [
  //   {property: ".level1.level2[2].level3", message: "err a"},
  //   {property: ".level1.level2[2].level3", message: "err b"},
  //   {property: ".level1.level2[4].level3", message: "err b"},
  // ]
  // Into an error tree:
  // {
  //   level1: {
  //     level2: {
  //       2: {level3: {errors: ["err a", "err b"]}},
  //       4: {level3: {errors: ["err b"]}},
  //     }
  //   }
  // };
  if (!errors.length) {
    return {};
  }
  return errors.reduce((errorSchema: any, error: any) => {
    const { property, message } = error;
    const path = toPath(property);
    let parent = errorSchema;

    // If the property is at the root (.level1) then toPath creates
    // an empty array element at the first index. Remove it.
    if (path.length > 0 && path[0] === "") {
      path.splice(0, 1);
    }

    for (const segment of path.slice(0)) {
      if (!(segment in parent)) {
        parent[segment] = {};
      }
      parent = parent[segment];
    }

    if (Array.isArray(parent.__errors)) {
      // We store the list of errors for this node in a property named __errors
      // to avoid name collision with a possible sub schema field named
      // "errors" (see `validate.createErrorHandler`).
      parent.__errors = parent.__errors.concat(message!);
    } else {
      if (message) {
        parent.__errors = [message];
      }
    }
    return errorSchema;
  }, {});
}

export function toErrorList(errorSchema: any, fieldPath: string[] = []) {
  // XXX: We should transform fieldName as a full field path string.
  if (!errorSchema) {
    return [];
  }

  let errorList: Array<any> = [];
  if ("__errors" in errorSchema) {
    errorList = errorList.concat(
      errorSchema.__errors!.map((message: string) => {
        const property = `.${fieldPath.join(".")}`;
        return {
          property,
          message,
          stack: `${property} ${message}`,
        };
      })
    );
  }

  return Object.keys(errorSchema).reduce((acc, key) => {
    if (key !== "__errors") {
      acc = acc.concat(toErrorList(errorSchema[key], [...fieldPath, key]));
    }
    return acc;
  }, errorList);
}

export function transformAjvErrors(errors = []) {
  console.log("transform-errors", errors);
  if (errors === null) {
    return [];
  }

  ajvLocalize(errors);
  console.log("transform-ajvLocalize-errors", errors);
  //[A.Z] Added filter to ignore enum validation.
  return errors
    .filter((i: any) => i.keyword !== "enum")
    .map((e: any) => {
      const { instancePath, keyword, message, params, schemaPath } = e;
      let property = instancePath.replace(/\//g, ".");

      if (property === "") {
        const { missingProperty = "" } = params || {};
        property = missingProperty;
      }

      // put data in expected format
      return {
        name: keyword,
        property,
        message,
        params, // specific to ajv
        stack: `${property} ${message}`.trim(),
        schemaPath,
      };
    });
}
