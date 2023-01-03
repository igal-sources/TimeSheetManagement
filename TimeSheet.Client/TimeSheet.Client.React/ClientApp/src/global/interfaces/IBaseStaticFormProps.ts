
export interface IBaseStaticFormProps {
  documentData?: any;
  isReadOnlyMode: boolean;
  formData?: any;
  formSubmitRef?: any;
  validateErrors?: any;
  onFormDataChanged: (newValue: any) => void;
  onSubmit: (newValue: any) => void;
}