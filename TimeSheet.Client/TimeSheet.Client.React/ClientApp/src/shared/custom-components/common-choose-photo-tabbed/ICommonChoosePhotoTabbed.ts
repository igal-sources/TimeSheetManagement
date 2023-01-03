import { ActionType } from "global/enums";

export interface ICommonChoosePhotoTabbedProps {
  imageObjectKey?: string;
  confirmAddPhoto: (newValue: any, imageInfo: any) => void;
  imageInfo: (value: any) => void;
  confirmWebcamCapture: (newValue: any) => void;
  isReadOnly: boolean;
}
