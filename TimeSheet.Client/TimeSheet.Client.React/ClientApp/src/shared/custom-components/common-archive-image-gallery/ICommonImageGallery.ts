import { ActionType } from "global/enums";

export interface ICommonImageGalleryProps {
  id?: string;
  images?: any;
  imageFileArray?: any;
  showBullets?: boolean;
  showIndex?: boolean;
  showThumbnails?: boolean;
  showPlayButton?: boolean;
  showFullscreenButton?: boolean;
  showNav?: boolean;
  showAddButton?: boolean;
  isRTL?: boolean;
  isReadOnly: boolean;
  additionalClass: string;
  // closeImageGalleryCard: () => void;
  // confirmImageGalleryCard: () => void;
  actionType?: ActionType;
  thumbnailPosition?: "top" | "right" | "bottom" | "left" | undefined;
  onScreenChange?: (fullScreen: boolean) => void;
}

interface IFileArray {
  images: IImageFile[];
}
export interface IImageFile {
  digitalMediaId?: number;
  archiveItemId?: number;
  mediaOrderId?: number;
  objectKey?: string;
  mediaFileFormatId?: number;
  imageBase64Binary?: any;
  fileDetailsJSON?: string;
  isDocumentScannedUsingOurSystem?: boolean;
  isOCRDataExists?: boolean;
  ocrDataJSON?: any;
  isChipDataExists?: boolean;
  chipDataJSON?: any;
  modifyingUserId?: number;
}
