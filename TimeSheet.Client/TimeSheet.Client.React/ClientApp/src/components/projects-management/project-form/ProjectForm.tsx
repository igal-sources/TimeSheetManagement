import React from "react";
import { IProjectForm } from "global/interfaces";
import { Box, Button } from "@mui/material";
import { CommonGeneralSelect, CommonTextField } from "common-ui-components";
import { formatMessage } from "devextreme/localization";
import { useStyles } from "./ProjectFormStyle";
import { toFinancialNumber } from "global/types";

export const ProjectForm = ({
  formData,
  customerList,
  formSubmitRef,
  isReadOnlyMode,
  validateErrors,
  onSubmit,
  onFormDataChanged,
}: IProjectForm) => {
  const classes = useStyles();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    formData[id] = value;

    console.log("handleInputChange-contactFormData: ", formData);
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;

    formData[name] = value;
    onFormDataChanged(event);

    console.log("handleSelectChange-formData: ", formData);
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
                id="projectName"
                label={formatMessage("TSM-ProjectsCard-ProjectName")}
                disabled={isReadOnlyMode}
                defaultValue={formData && formData.projectName}
                onChange={handleInputChange}
                hasErrors={!!validateErrors?.projectName}
                helperText={validateErrors?.projectName && validateErrors?.projectName.__errors[0]}
                maxLength={30}
              />
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "100%", gap: 2, marginBottom: "15px" }}>
              <CommonGeneralSelect
                id="customerId"
                label={formatMessage("TSM-ProjectsCard-CustomerName")}
                disabled={isReadOnlyMode}
                defaultValue={formData?.customerId}
                onChange={handleSelectChange}
                enumOptions={customerList}
                optionText={"customerName"}
                optionId={"customerId"}
                hasErrors={!!validateErrors?.customerId}
                helperText={validateErrors?.customerId && validateErrors?.customerId.__errors[0]}
              />
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "100%", gap: 2, marginBottom: "15px" }}>
              <CommonTextField
                id="hourlyRate"
                label={formatMessage("TSM-ProjectsCard-HourlyRate")}
                disabled={isReadOnlyMode}
                defaultValue={formData && toFinancialNumber(formData.hourlyRate)}
                onChange={handleInputChange}
                hasErrors={!!validateErrors?.hourlyRate}
                helperText={validateErrors?.hourlyRate && validateErrors?.hourlyRate.__errors[0]}
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
