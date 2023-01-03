import { ActionType } from "../../../global/enums";

export interface ICommonPopupDialogProps {
  dialogTitle?: string;
  children?: any;
  actionType?: ActionType;
  showCard: boolean;
  isSubmitDisable: boolean;
  dialogPaperMinHeight: string;
  dialogPaperMaxHeight: string;
  maxWidthSize?: any;
  onReadOnlyChanged: (readOnly: any) => void;
  closeCard: () => void;
  confirmCard: () => void;
  handleSaveDocument: (event: any) => void;
}
