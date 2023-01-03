import { ActionType } from "global/enums";

 export interface IBasePopupCardProps {
  documentId?: number;
  closeCard: () => void;
  confirmCard: () => void;
  actionType?: ActionType;
}