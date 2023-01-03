import React from "react";
import { WidgetProps, utils } from "@rjsf/core";
import { getLookupsLanguage } from "common-localization";
import { CommonSelectCountry } from "common-ui-components";

const langTag = getLookupsLanguage();

const { asNumber, guessType } = utils;

const numbers = new Set(["number", "integer"]);

const processValue = (schema: any, value: any) => {
  // "enum" is a reserved word, so only "type" and "items" can be destructured
  const { type, items } = schema;
  if (value === "") {
    return undefined;
  } else if (type === "array" && items && numbers.has(items.type)) {
    return value.map(asNumber);
  } else if (type === "boolean") {
    return value === "true";
  } else if (type === "number") {
    return asNumber(value);
  }

  // If type is undefined, but an enum is present, try and infer the type from
  // the enum values
  if (schema.enum) {
    if (schema.enum.every((x: any) => guessType(x) === "number")) {
      return asNumber(value);
    } else if (schema.enum.every((x: any) => guessType(x) === "boolean")) {
      return value === "true";
    }
  }

  return value;
};

const SelectCountryWidget = ({
  schema,
  id,
  label,
  required,
  disabled,
  readonly,
  value,
  onChange,
}: WidgetProps) => {
  const _onChange = ({ target: { value } }: React.ChangeEvent<{ name?: string; value: unknown }>) =>
    onChange(processValue(schema, value));

  return (
    <CommonSelectCountry
      id={id}
      name={id}
      label={label || schema.title}
      value={value}
      required={required}
      disabled={disabled}
      onChange={_onChange}
      fullWidth={false}
      readOnly={readonly}
      lookupsLanguage={langTag}
    />
  );
};

export default SelectCountryWidget;
