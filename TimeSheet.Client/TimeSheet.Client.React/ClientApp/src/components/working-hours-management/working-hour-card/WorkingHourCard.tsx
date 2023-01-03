import React, { useState, useEffect, useRef } from "react";
import { CommonPopupDialog } from "common-ui-components";
import { NotifyToast } from "../../../shared/notify-toast/NotifyToast";
import { formatMessage } from "devextreme/localization";
import { WorkingHourForm } from "../working-hour-form/WorkingHourForm";
import {
  fetchProjectsSelectList,
  fetchWorkingHoursById,
  saveWorkingHours,
  updateWorkingHours,
} from "../../../services";
import { IBasePopupCardProps } from "global/interfaces";
import { ActionType } from "global/enums";
import schema from "shared/models/json-schema-validations/workingHour-schema-validation.json";
import { workingHourEmptyState } from "shared/models/workingHourEmptyState";
import { isEmpty } from "lodash";
import { createAjvInstance, validateSchema } from "helpers/validateHelper";
import "./working-hour-card.scss";

export const WorkingHourCard = ({ documentId, closeCard, confirmCard, actionType }: IBasePopupCardProps) => {
  const formRef = useRef<HTMLButtonElement>(null);
  const isCancelled = useRef<boolean>(false);
  const [workingHourFormData, setWorkingHourFormData] = useState<any>();
  const [projectList, setProjectList] = useState<any>();
  const [validateErrors, setValidateErrors] = useState<any>({});
  const [isReadOnlyMode, setIsReadOnlyMode] = useState<boolean>(false);
  const [isShowCard, setIsShowCard] = useState<boolean>(false);
  const [submitIsDisable, setSubmitIsDisable] = useState<boolean>(false);

  let ajv = createAjvInstance();

  
  const getProjectsSelectList = async () => {
    const response = await fetchProjectsSelectList();
    if (response && response.responseStatusCode > 0) {
      console.log("fetchCustomerSelectList-error: ", response);
      return;
    }
    
    setProjectList(response);
  };
  
  const initData = async () => {

    const response = await fetchProjectsSelectList();
    if (response && response.responseStatusCode > 0) {
      console.log("fetchCustomerSelectList-error: ", response);
      return;
    }
    
    setProjectList(response);

    switch (actionType) {
      case ActionType.ADD:
        setWorkingHourFormData(workingHourEmptyState());
        setIsShowCard(true);
        setIsReadOnlyMode(false);
        break;
      case ActionType.EDIT:
        const response = await fetchWorkingHoursById(documentId as number);
        if (response && response.responseStatusCode > 0) {
          console.log("fetchWorkingHoursById-error: ", response);
          return;
        }

        setWorkingHourFormData(response);
        setIsReadOnlyMode(true);
        setIsShowCard(true);
        console.log("initData-fetchWorkingHoursById: ", response);
        break;
      default:
        throw Error(`Action: [${actionType}] is not supported`);
    }
  };

  const handleSaveProject = (e: any) => {
    console.log("handleSaveProject-formData: ", workingHourFormData);

    const validateSchemaResults = validateSchema({
      data: workingHourFormData,
      schema: schema,
      ajvObject: ajv,
      onValidateErrors: setValidateErrors,
    });

    console.log("validateSchema: ", validateSchemaResults);

    if (isEmpty(validateSchemaResults)) {
      formRef.current && formRef.current.click();
    }
  };

  const onSubmit = async (newValue: any) => {
    let response: any;
    console.log(">>> finalObject: ", newValue);

    switch (actionType) {
      case ActionType.ADD:
        setSubmitIsDisable(true);

        response = await saveWorkingHours(newValue);
        console.log(">>> saveWorkingHours: ", response);
        if (response && response.responseStatusCode > 0) {
          setSubmitIsDisable(false);
          return;
        }

        setSubmitIsDisable(true);
        setWorkingHourFormData(response);
        NotifyToast(formatMessage("Common-FormSavedSuccessfully"));
        break;
      case ActionType.EDIT:
        response = await updateWorkingHours(newValue);
        console.log(">>> updateWorkingHours: ", response);

        if (response && response.responseStatusCode > 0) {
          setSubmitIsDisable(false);
          return;
        }

        setSubmitIsDisable(true);
        setWorkingHourFormData(response);
        NotifyToast(formatMessage("Common-FormSavedSuccessfully"));
        break;
      default:
        throw Error(`Action: [${actionType}] is not supported`);
    }
  };

  const handleChange = (e: any) => {
    console.log("handleChange", e);
    // setSubmitIsDisable(false);
  };

  useEffect(() => {
    !isCancelled.current && initData();
    return () => {
      isCancelled.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <CommonPopupDialog
        dialogTitle={formatMessage("TSM-WorkingHourForm-WorkingHourDetails")}
        actionType={actionType}
        isSubmitDisable={submitIsDisable}
        showCard={isShowCard}
        closeCard={closeCard}
        confirmCard={confirmCard}
        onReadOnlyChanged={setIsReadOnlyMode}
        handleSaveDocument={handleSaveProject}
        maxWidthSize={"md"}
      >
        <div>
          <WorkingHourForm
            formSubmitRef={formRef}
            formData={workingHourFormData && workingHourFormData}
            projectList={projectList}
            isReadOnlyMode={isReadOnlyMode}
            onSubmit={onSubmit}
            validateErrors={validateErrors}
            onFormDataChanged={handleChange}
          />
        </div>
      </CommonPopupDialog>
    </div>
  );
};
