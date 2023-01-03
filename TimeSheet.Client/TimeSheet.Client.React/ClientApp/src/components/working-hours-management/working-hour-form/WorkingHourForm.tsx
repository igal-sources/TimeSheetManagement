import React, { useState } from "react";
import { IWorkingHoursForm } from "global/interfaces/working-hours/IWorkingHoursForm";
import { Box, Button, TextField } from "@mui/material";
import { CommonDateTime, CommonGeneralSelect, CommonTextField } from "common-ui-components";
import { formatMessage } from "devextreme/localization";
import { useStyles } from "./WorkingHourFormStyle";
import { toFinancialNumber } from "global/types";
import moment from "moment";
import "./working-hour-form.scss";

export const WorkingHourForm = ({
  formData,
  projectList,
  formSubmitRef,
  isReadOnlyMode,
  validateErrors,
  onSubmit,
  onFormDataChanged,
}: IWorkingHoursForm) => {
  const classes = useStyles();
  const [totalHours, setTotalHours] = useState<string | undefined>();

  const calculateTotalHours = (valueStart: string, valueEnd: string) => {
    console.log("valueStart, valueEnd", valueStart, valueEnd);

    if (valueStart === undefined || valueEnd === undefined) {
      return 0;
    }

    var timeStart = moment("01/01/2000 " + valueStart);
    var timeEnd = moment("01/01/2000 " + valueEnd);

    var duration = moment.duration(timeEnd.diff(timeStart.toString()));
    var hourDiff = duration.asHours();
    
    console.log("hourDiff: ", hourDiff);
    return hourDiff;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    formData[id] = value;

    if (id === "endTime" || id === "startTime") {
      const total = calculateTotalHours(formData.startTime, formData.endTime).toString();
    
      setTotalHours(total);
      formData.totalHours = total;
    }
    console.log("handleInputChange-formData: ", formData);
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
              <CommonGeneralSelect
                id="projectId"
                label={formatMessage("TSM-WorkingHourForm-ProjectName")}
                disabled={isReadOnlyMode}
                defaultValue={formData?.projectId}
                onChange={handleSelectChange}
                enumOptions={projectList}
                optionText={"projectName"}
                optionId={"projectId"}
                hasErrors={!!validateErrors?.projectId}
                helperText={validateErrors?.projectId && validateErrors?.projectId.__errors[0]}
              />
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "100%", gap: 2, marginBottom: "15px" }}>
              <CommonDateTime
                id="workingDate"
                label={formatMessage("TSM-WorkingHourForm-WorkingDate")}
                disabled={isReadOnlyMode}
                defaultValue={formData && formData.workingDate}
                onChange={handleInputChange}
                hasErrors={!!validateErrors?.workingDate}
                helperText={validateErrors?.workingDate && validateErrors?.workingDate.__errors[0]}
              />
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "100%", gap: 2, marginBottom: "15px" }}>
              <TextField
                id="startTime"
                type="time"
                disabled={isReadOnlyMode}
                label={formatMessage("TSM-WorkingHourForm-StartTime")}
                variant="outlined"
                fullWidth={true}
                defaultValue={formData && formData.startTime}
                error={!!validateErrors?.startTime}
                onChange={handleInputChange}
                size="small"
                helperText={validateErrors?.startTime && validateErrors?.startTime.__errors[0]}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "100%", gap: 2, marginBottom: "15px" }}>
              <TextField
                id="endTime"
                type="time"
                disabled={isReadOnlyMode}
                label={formatMessage("TSM-WorkingHourForm-EndTime")}
                variant="outlined"
                fullWidth={true}
                defaultValue={formData && formData.endTime}
                error={!!validateErrors?.endTime}
                onChange={handleInputChange}
                size="small"
                helperText={validateErrors?.endTime && validateErrors?.endTime.__errors[0]}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "100%", gap: 2, marginBottom: "15px" }}>
              <TextField
                id="totalHours"
                fullWidth={false}
                disabled={isReadOnlyMode}
                label={formatMessage("TSM-WorkingHourForm-TotalHours")}
                variant="outlined"
                size="small"
                value={formData && toFinancialNumber(formData.totalHours as string)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "100%", gap: 2, marginBottom: "15px" }}>
              <CommonTextField
                id="taskDescription"
                label={formatMessage("TSM-WorkingHourForm-TaskDescription")}
                disabled={isReadOnlyMode}
                defaultValue={formData && formData.taskDescription}
                onChange={handleInputChange}
                hasErrors={!!validateErrors?.taskDescription}
                helperText={validateErrors?.taskDescription && validateErrors?.taskDescription.__errors[0]}
                maxLength={200}
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
