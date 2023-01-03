import React, { useState, useEffect, useRef } from "react";
import { CommonPopupDialog } from "common-ui-components";
import { NotifyToast } from "../../../shared/notify-toast/NotifyToast";
import { formatMessage } from "devextreme/localization";
import { ProjectForm } from "../project-form/ProjectForm";
import { fetchProjectById, fetchCustomerSelectList, saveProject, updateProject } from "../../../services";
import { IBasePopupCardProps } from "global/interfaces";
import { ActionType } from "global/enums";
import schema from "shared/models/json-schema-validations/projects-schema-validation.json";
import { projectEmptyState } from "shared/models/projectEmptyState";
import { isEmpty } from "lodash";
import { createAjvInstance, validateSchema } from "helpers/validateHelper";
import "./projects-card.scss";

export const ProjectCard = ({ documentId, closeCard, confirmCard, actionType }: IBasePopupCardProps) => {
  const formRef = useRef<HTMLButtonElement>(null);
  const isCancelled = useRef<boolean>(false);
  const [projectFormData, setProjectFormData] = useState<any>();
  const [customerList, setCustomerList] = useState<any>();
  const [validateErrors, setValidateErrors] = useState<any>({});
  const [isReadOnlyMode, setIsReadOnlyMode] = useState<boolean>(false);
  const [isShowCard, setIsShowCard] = useState<boolean>(false);
  const [submitIsDisable, setSubmitIsDisable] = useState<boolean>(false);

  let ajv = createAjvInstance();

  const initData = async () => {

    const response = await fetchCustomerSelectList();
    if (response && response.responseStatusCode > 0) {
      console.log("fetchCustomerSelectList-error: ", response);
      return;
    }

    setCustomerList(response);

    switch (actionType) {
      case ActionType.ADD:
        setProjectFormData(projectEmptyState());
        setIsShowCard(true);
        setIsReadOnlyMode(false);
        break;
      case ActionType.EDIT:
        const response = await fetchProjectById(documentId as number);
        if (response && response.responseStatusCode > 0) {
          console.log("fetchProjectById-error: ", response);
          return;
        }

        setProjectFormData(response);
        setIsReadOnlyMode(true);
        setIsShowCard(true);
        console.log("initData-fetchProjectById: ", response);
        break;
      default:
        throw Error(`Action: [${actionType}] is not supported`);
    }
  };

  const handleSaveProject = (e: any) => {
    console.log("handleSaveProject-formData: ", projectFormData);

    const validateSchemaResults = validateSchema({
      data: projectFormData,
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

        response = await saveProject(newValue);
        console.log(">>> saveProject: ", response);
        if (response && response.responseStatusCode > 0) {
          setSubmitIsDisable(false);
          return;
        }

        setSubmitIsDisable(true);
        setProjectFormData(response);
        NotifyToast(formatMessage("Common-FormSavedSuccessfully"));
        break;
      case ActionType.EDIT:
        response = await updateProject(newValue);
        console.log(">>> updateProject: ", response);

        if (response && response.responseStatusCode > 0) {
          setSubmitIsDisable(false);
          return;
        }

        setSubmitIsDisable(true);
        setProjectFormData(response);
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
        dialogTitle={formatMessage("TSM-ProjectCard-ProjectDetails")}
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
          <ProjectForm
            formSubmitRef={formRef}
            customerList={customerList}
            formData={projectFormData && projectFormData}
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
