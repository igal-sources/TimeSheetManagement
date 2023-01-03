import React, { useState, useEffect, useRef } from "react";
import { CommonPopupDialog } from "common-ui-components";
import { NotifyToast } from "../../../shared/notify-toast/NotifyToast";
import { formatMessage } from "devextreme/localization";
import { CustomerForm } from "../customer-form/CustomerForm";
import { fetchCustomerById, saveCustomer, updateCustomer } from "../../../services";
import { IBasePopupCardProps } from "global/interfaces";
import { ActionType } from "global/enums";
import schema from "shared/models/json-schema-validations/customers-schema-validation.json";
import { customerEmptyState } from "shared/models/customerEmptyState";
import { isEmpty } from "lodash";
import { createAjvInstance, validateSchema } from "helpers/validateHelper";
import "./customer-card.scss";

export const CustomerCard = ({ documentId, closeCard, confirmCard, actionType }: IBasePopupCardProps) => {
  const formRef = useRef<HTMLButtonElement>(null);
  const isCancelled = useRef<boolean>(false);
  const [customerFormData, setCustomerFormData] = useState<any>();
  const [validateErrors, setValidateErrors] = useState<any>({});
  const [isReadOnlyMode, setIsReadOnlyMode] = useState<boolean>(false);
  const [isShowCard, setIsShowCard] = useState<boolean>(false);
  const [submitIsDisable, setSubmitIsDisable] = useState<boolean>(false);

  let ajv = createAjvInstance();

  const initData = async () => {
    switch (actionType) {
      case ActionType.ADD:
        setCustomerFormData(customerEmptyState());
        setIsShowCard(true);
        setIsReadOnlyMode(false);
        break;
      case ActionType.EDIT:
        const response = await fetchCustomerById(documentId as number);
        if (response && response.responseStatusCode > 0) {
          console.log("fetchCustomerById-error: ", response);
          return;
        }

        setCustomerFormData(response);
        setIsReadOnlyMode(true);
        setIsShowCard(true);
        console.log("initData-fetchCustomerById: ", response);
        break;
      default:
        throw Error(`Action: [${actionType}] is not supported`);
    }
  };

  const handleSaveCustomer = (e: any) => {
    console.log("handleSaveCustomer-formData: ", customerFormData);

    const validateSchemaResults = validateSchema({
      data: customerFormData,
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

        response = await saveCustomer(newValue);
        console.log(">>> saveCustomer: ", response);
        if (response && response.responseStatusCode > 0) {
          setSubmitIsDisable(false);
          return;
        }

        setSubmitIsDisable(true);
        setCustomerFormData(response);
        NotifyToast(formatMessage("Common-FormSavedSuccessfully"));
        break;
      case ActionType.EDIT:
        response = await updateCustomer(newValue);
        console.log(">>> updateCustomer: ", response);

        if (response && response.responseStatusCode > 0) {
          setSubmitIsDisable(false);
          return;
        }

        setSubmitIsDisable(true);
        setCustomerFormData(response);
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
        dialogTitle={formatMessage("TSM-CustomerCard-CustomerDetails")}
        actionType={actionType}
        isSubmitDisable={submitIsDisable}
        showCard={isShowCard}
        closeCard={closeCard}
        confirmCard={confirmCard}
        onReadOnlyChanged={setIsReadOnlyMode}
        handleSaveDocument={handleSaveCustomer}
        maxWidthSize={"md"}
      >
        <div>
          <CustomerForm
            formSubmitRef={formRef}
            formData={customerFormData && customerFormData}
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
