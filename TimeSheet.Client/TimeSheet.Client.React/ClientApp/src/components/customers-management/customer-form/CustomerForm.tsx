import React from "react";
import { IBaseStaticFormProps } from "global/interfaces";
import { Box, Button } from "@mui/material";
import { CommonTextField } from "common-ui-components";
import { formatMessage } from "devextreme/localization";
import { useStyles } from "./CustomerFormStyle";

export const CustomerForm = ({
  formData,
  formSubmitRef,
  isReadOnlyMode,
  validateErrors,
  onSubmit,
  onFormDataChanged,
}: IBaseStaticFormProps) => {
  const classes = useStyles();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleInputChange-event", event.target.id, event.target.value);
    const { id, value } = event.target;

    formData[id] = value;

    console.log("handleInputChange-contactFormData: ", formData);
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    console.log("onSubmit-formData: ", formData);

    onSubmit(formData);
  };
  return (
    <div className="form-data-container">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "100%",
          gap: 0,
          gridTemplateRows: "auto",
          gridTemplateAreas: `"formData"`,
        }}
      >
        <Box className={classes.boxContainer} sx={{ gridArea: "formData" }}>
          <form onSubmit={onFormSubmit} onChange={onFormDataChanged}>
            <Box sx={{ display: "grid", gridTemplateColumns: "100%", gap: 2, marginBottom: "15px" }}>
              <CommonTextField
                id="customerName"
                label={formatMessage("TSM-CustomerForm-CustomerName")}
                disabled={isReadOnlyMode}
                defaultValue={formData && formData.customerName}
                onChange={handleInputChange}
                hasErrors={!!validateErrors?.customerName}
                helperText={validateErrors?.customerName && validateErrors?.customerName.__errors[0]}
                maxLength={30}
              />
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "100%", gap: 2, marginBottom: "15px" }}>
              <CommonTextField
                id="contactName"
                label={formatMessage("TSM-CustomerForm-ContactName")}
                disabled={isReadOnlyMode}
                defaultValue={formData && formData.contactName}
                onChange={handleInputChange}
                hasErrors={!!validateErrors?.contactName}
                helperText={validateErrors?.contactName && validateErrors?.contactName.__errors[0]}
                maxLength={30}
              />
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "100%", gap: 2, marginBottom: "15px" }}>
              <CommonTextField
                id="contactJobTitle"
                label={formatMessage("TSM-CustomerForm-ContactJobTitle")}
                disabled={isReadOnlyMode}
                defaultValue={formData && formData.contactJobTitle}
                onChange={handleInputChange}
                hasErrors={!!validateErrors?.contactJobTitle}
                helperText={validateErrors?.contactJobTitle && validateErrors?.contactJobTitle.__errors[0]}
                maxLength={30}
              />
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "100%", gap: 2, marginBottom: "15px" }}>
              <CommonTextField
                id="address"
                label={formatMessage("TSM-CustomerForm-Address")}
                disabled={isReadOnlyMode}
                defaultValue={formData && formData.address}
                onChange={handleInputChange}
                hasErrors={!!validateErrors?.address}
                helperText={validateErrors?.address && validateErrors?.address.__errors[0]}
                maxLength={30}
              />
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "100%", gap: 2, marginBottom: "15px" }}>
              <CommonTextField
                id="emailAddress"
                label={formatMessage("TSM-CustomerForm-EmailAddress")}
                disabled={isReadOnlyMode}
                defaultValue={formData && formData.emailAddress}
                onChange={handleInputChange}
                hasErrors={!!validateErrors?.emailAddress}
                helperText={validateErrors?.emailAddress && validateErrors?.emailAddress.__errors[0]}
                maxLength={30}
              />
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "100%", gap: 2, marginBottom: "15px" }}>
              <CommonTextField
                id="phoneNumber"
                label={formatMessage("TSM-CustomerForm-PhoneNumber")}
                disabled={isReadOnlyMode}
                defaultValue={formData && formData.phoneNumber}
                onChange={handleInputChange}
                hasErrors={!!validateErrors?.phoneNumber}
                helperText={validateErrors?.phoneNumber && validateErrors?.phoneNumber.__errors[0]}
                maxLength={30}
              />
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "100%", gap: 2, marginBottom: "15px" }}>
              <CommonTextField
                id="bookkeepingNumber"
                label={formatMessage("TSM-CustomerForm-BookkeepingNumber")}
                disabled={isReadOnlyMode}
                defaultValue={formData && formData.bookkeepingNumber}
                onChange={handleInputChange}
                hasErrors={!!validateErrors?.bookkeepingNumber}
                helperText={validateErrors?.bookkeepingNumber && validateErrors?.bookkeepingNumber.__errors[0]}
                maxLength={30}
              />
            </Box>
            <div>
              <Button
                ref={formSubmitRef}
                type="submit"
                className={classes.submitButton}
                variant="contained"
                color="primary"
              />
            </div>
          </form>
        </Box>
      </Box>
    </div>
  );
};
