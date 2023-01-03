import React from "react";
import { WidgetProps, utils } from "@rjsf/core";
import { mapLookupToEnum, getLookupsLanguage } from "common-localization";

import { useMuiComponent } from "../MuiComponentContext";

const { asNumber, guessType } = utils;

const nums = new Set(["number", "integer"]);

const langTag = getLookupsLanguage();

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
const processValue = (schema: any, value: any) => {
  // "enum" is a reserved word, so only "type" and "items" can be destructured
  const { type, items } = schema;
  if (value === "") {
    return undefined;
  } else if (type === "array" && items && nums.has(items.type)) {
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

const SelectWidget = ({
  schema,
  id,
  options,
  label,
  required,
  disabled,
  readonly,
  value,
  multiple,
  autofocus,
  onChange,
  onBlur,
  onFocus,
  rawErrors = [],
}: WidgetProps) => {
  const { TextField, MenuItem } = useMuiComponent();
  const { enumDisabled } = options;
  let { enumOptions } = options;

  if ((enumOptions as any) !== null && ((enumOptions as any)[0].value as any) === "lookup") {
    enumOptions = mapLookupToEnum.filter((obj) => obj.lookupName === (enumOptions as any)[0].label)[0]
      .lookupObject;
  }

  // console.log("rjsf-SELECT-WIDGET-enumOptions: ", enumOptions);
  const emptyValue = multiple ? [] : "";

  const _onChange = ({ target: { value } }: React.ChangeEvent<{ name?: string; value: unknown }>) =>
    onChange(processValue(schema, value));
  const _onBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) =>
    onBlur(id, processValue(schema, value));
  const _onFocus = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) =>
    onFocus(id, processValue(schema, value));

  return (
    <TextField
      id={id}
      label={label || schema.title}
      select
      value={typeof value === "undefined" ? emptyValue : value}
      required={required}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      error={rawErrors.length > 0}
      onChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
      size="small"
      InputLabelProps={{
        shrink: true,
      }}
      SelectProps={{
        multiple: typeof multiple === "undefined" ? false : multiple,
      }}
    >
      {(enumOptions as any).map((enumObj: any, i: number) => {
        const disabled: any = enumDisabled && (enumDisabled as any).indexOf(Number(enumObj.id)) != -1;
        return (
          <MenuItem key={i} value={enumObj.id} disabled={disabled}>
            {enumObj[langTag]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectWidget;
