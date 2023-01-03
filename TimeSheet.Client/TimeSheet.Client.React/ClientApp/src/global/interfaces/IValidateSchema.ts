import { ActionType } from "global/enums";

export interface IValidateSchemaProps {
  data: any;
  schema: any;
  ajvObject: any;
  onValidateErrors: (newValue: any) => void;
}

