import React from "react";
import { ICommonLookupsMultipleSelectProps } from "./ICommonLookupsMultipleSelect";
import {
  FormHelperText,
  MenuItem,
  FormControl,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  InputLabel,
} from "@mui/material";
import { useStyles } from "../CommonStyle";

export const CommonLookupsMultipleSelect = ({
  id,
  className,
  helperText,
  autoFocus,
  required,
  disabled,
  fullWidth,
  isMultiple,
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  hasErrors,
  enumOptions,
  lookupsLanguage,
}: ICommonLookupsMultipleSelectProps) => {
  const classes = useStyles();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const lookupLang = lookupsLanguage ? lookupsLanguage : "he_IL";
  const emptyValue = isMultiple ? [] : "";

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
    onChange(event, typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
      <Select
        id={id}
        name={id}
        labelId="demo-multiple-checkbox-label"
        className={className}
        label={label}
        autoFocus={autoFocus}
        required={required}
        disabled={disabled}
        variant="outlined"
        multiple
        value={typeof value === "undefined" ? emptyValue : value}
        fullWidth={fullWidth}
        error={hasErrors}
        onChange={handleChange}
        size="small"
        input={<OutlinedInput sx={{ fontSize: "18px" }} />}
        renderValue={(selected) => selected.join(", ")}
      >
        {(enumOptions as any).map((enumObj: any, i: number) => {
          return (
            <MenuItem key={i} value={enumObj.id} disabled={disabled}>
              <Checkbox checked={personName.indexOf(enumObj[`${lookupLang}`]) > -1} />
              <ListItemText primary={enumObj[`${lookupLang}`]} />
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

CommonLookupsMultipleSelect.defaultProps = {
  required: false,
  disabled: false,
  fullWidth: true,
  autoFocus: false,
  isMultiple: true,
  className: "",
  hasErrors: false,
  helperText: "",
};

export default CommonLookupsMultipleSelect;
