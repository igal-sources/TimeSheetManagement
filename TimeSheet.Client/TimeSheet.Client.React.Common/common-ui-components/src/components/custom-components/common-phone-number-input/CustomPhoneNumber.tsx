import React, { forwardRef } from "react";
import { TextField } from "@mui/material";

const CustomPhoneNumber = (props: any, ref: any) => {

  return (
    <TextField
      {...props}      
      id={props.id}
      name={props.id}
      inputRef={ref}
      defaultValue={props.defaultValue || props.defaultValue === 0 ? props.defaultValue : ''}
      fullWidth={props.fullWidth}
      size="small"
      label={props.label}
      variant="outlined"
      required={props.required}
      error={props.hasErrors}
      helperText={props.helperText}
      // inputProps={{ maxLength: props.maxLength }}
    />
  );
};

export default forwardRef(CustomPhoneNumber);
