import React from "react";
import { getLookupsLanguage } from "common-localization";
import { WidgetProps } from "@rjsf/core";
import { CommonJewishDatePicker } from "common-ui-components";

const langTag = getLookupsLanguage();
const isHebrew = langTag === "he_IL" ? true : false;
// const { asNumber, guessType } = utils;

// const numbers = new Set(["number", "integer"]);

// const processValue = (schema: any, value: any) => {
//   // "enum" is a reserved word, so only "type" and "items" can be destructured
//   const { type, items } = schema;
//   if (value === "") {
//     return undefined;
//   } else if (type === "array" && items && numbers.has(items.type)) {
//     return value.map(asNumber);
//   } else if (type === "boolean") {
//     return value === "true";
//   } else if (type === "number") {
//     return asNumber(value);
//   }

//   // If type is undefined, but an enum is present, try and infer the type from
//   // the enum values
//   if (schema.enum) {
//     if (schema.enum.every((x: any) => guessType(x) === "number")) {
//       return asNumber(value);
//     } else if (schema.enum.every((x: any) => guessType(x) === "boolean")) {
//       return value === "true";
//     }
//   }

//   return value;
// };

// const date = new Date();

const JewishDatePickerWidget = ({ id, value, onChange }: WidgetProps) => {
  // const _onChange = (day: any) => {
  //   console.log("_onChange-day:", day);
  //   onChange(processValue(schema, day));
  // };

  const _onChange = (day: any) => onChange(day);

  console.log("JewishDatePickerWidget-value:", JSON.parse(value).jewishDate);

  return (
    <CommonJewishDatePicker
      name={id}
      value={value && JSON.parse(value).jewishDate}
      isHebrewDate={isHebrew}
      onSelectDateClick={_onChange}
    />
  );
};

export default JewishDatePickerWidget;
