import { ActionType } from "global/enums";

export interface IBaseDocumentProps {
  document?: any;
  actionType?: ActionType;
  isReadOnly: boolean;
  formFieldDataChanged: (value: any) => void;
}