import React, { useState } from "react";
import Draggable from "react-draggable";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
  AppBar,
  Tooltip,
  Button,
  Paper,
  PaperProps,
} from "@mui/material";
import { formatMessage } from "devextreme/localization";
import { CommonChoosePhotoTabbed } from "../common-choose-photo-tabbed/CommonChoosePhotoTabbed";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ICommonImageGalleryProps, IImageFile } from "./ICommonImageGallery";
import { useStyles } from "./CommonImageGalleryStyle";
import { ActionType } from "global/enums";
import { isEmpty } from "lodash";
import "./common-archive-image-gallery.css";

export const CommonImageGallery = ({
  id,
  images,
  imageFileArray,
  showBullets,
  showIndex,
  showThumbnails,
  showPlayButton,
  additionalClass,
  showFullscreenButton,
  showNav,
  showAddButton,
  isRTL,
  thumbnailPosition,
  isReadOnly,
  onScreenChange,
}: ICommonImageGalleryProps) => {
  const classes = useStyles();
  const [isShowCard, setIsShowCard] = useState<boolean>(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(false);

  console.log('images', images);

  function PaperComponent(props: PaperProps) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        disabled={false}
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }

  const onPopupHiding = () => {
    onCloseInnerCard();
    onConfirmInnerCard(false);
  };

  let imageFileObject!: IImageFile;
  console.log("imageFileArray", imageFileArray);

  const onCloseInnerCard = () => {
    console.log(">>> onCloseInnerCard");
    setIsShowCard(false);
  };

  const onConfirmInnerCard = (confirm: boolean = true) => {
    console.log(">>> onConfirmInnerCard");
    if (!confirm) {
      images.splice(-1);
    }
  };

  const onAddButtonClick = () => {
    setIsShowCard(true);
  };

  const getMaxMediaOrderId = () => {
    if (!isEmpty(imageFileArray)) {
      const maxId = Math.max(...imageFileArray.map((item: any) => item.mediaOrderId));
      return maxId + 1;
    }

    return 1;
  };

  const handleSaveDocument = async (e: any) => {
    imageFileArray.push(imageFileObject);
    console.log("handleSaveDocument", imageFileArray);
    onCloseInnerCard();
  };

  const onImageLoaded = (data: any, imageInfo: any) => {
    console.log("onImageLoaded", imageFileArray, imageInfo);
    imageFileObject = {
      ...imageFileObject,
      digitalMediaId: -1,
      archiveItemId: -1,
      mediaOrderId: getMaxMediaOrderId(),
      imageBase64Binary: data,
      modifyingUserId: 1,
    };

    images.push({ original: data, thumbnail: data });
    console.log("imageFileObject", imageFileObject);
  };

  const onImageInfo = (data: any) => {
    console.log("onImageInfo", data);
    imageFileObject = { ...imageFileObject, fileDetailsJSON: data };
    console.log("imageFileObject", imageFileObject);
  };

  const onImageCaptured = (data: any) => {
    console.log("onImageCaptured", imageFileArray);
    imageFileObject = {
      digitalMediaId: -1,
      archiveItemId: -1,
      mediaOrderId: getMaxMediaOrderId(),
      imageBase64Binary: data,
      fileDetailsJSON: "{}",
      modifyingUserId: 1,
    };
    console.log("imageFileObject", imageFileObject);
  };

  return (
    <div id={id} style={isReadOnly ? { pointerEvents: "none", opacity: "0.4" } : {}}>
      <div>
        <Dialog
          open={isShowCard}
          classes={{ paper: classes.dialogPaper }}
          PaperProps={{
            style: {
              minHeight: "85vh",
              maxHeight: "85vh",
            },
          }}
          maxWidth={"lg"}
          fullWidth={true}
          fullScreen={false}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          disableEnforceFocus={true}
          onClose={(_: any, reason: string) => {
            if (reason !== "backdropClick") {
              onPopupHiding();
            }
          }}
        >
          <AppBar
            id="draggable-dialog-title"
            dir="ltr"
            className={classes.appBar}
            sx={{ position: "relative" }}
          >
            <Toolbar variant="dense" className={classes.toolbar}>
              <IconButton edge="start" color="inherit" onClick={onPopupHiding} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogTitle></DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <div>
              <CommonChoosePhotoTabbed
                confirmAddPhoto={(result: any, imageInfo: any) => onImageLoaded(result, imageInfo)}
                imageInfo={(result: any) => onImageInfo(result)}
                confirmWebcamCapture={(result: any) => onImageCaptured(result)}
                isReadOnly={false}
              />
            </div>
          </DialogContent>

          <DialogActions className={classes.dialogActions}>
            <Button
              className={classes.dialogActions_Button}
              variant="outlined"
              disabled={isSaveDisabled}
              onClick={(e: any) => handleSaveDocument(e)}
            >
              {formatMessage("DocumentsContainer-Save")}
            </Button>
            <Button
              className={classes.dialogActions_Button}
              variant="outlined"
              disabled={false}
              onClick={onPopupHiding}
            >
              {formatMessage("DocumentsContainer-Cancel")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        {showAddButton && (
          <Tooltip title={formatMessage("PhotoGallery-AddPhoto")} disableInteractive>
            <Button
              variant="contained"
              color="primary"
              className={classes.addButton}
              onClick={onAddButtonClick}
            >
              ...
            </Button>
          </Tooltip>
        )}
      </div>
      <ImageGallery
        items={images}
        showBullets={showBullets}
        showIndex={showIndex}
        showThumbnails={showThumbnails}
        lazyLoad={true}
        showPlayButton={showPlayButton}
        additionalClass={additionalClass}
        showFullscreenButton={showFullscreenButton}
        showNav={showNav}
        isRTL={isRTL}
        thumbnailPosition={thumbnailPosition}
        onScreenChange={onScreenChange}
      />
    </div>
  );
};

CommonImageGallery.defaultProps = {
  showBullets: true,
  showIndex: false,
  showThumbnails: false,
  showPlayButton: false,
  additionalClass: "",
  showFullscreenButton: false,
  showNav: false,
  showAddButton: true,
  thumbnailPosition: "bottom",
};

export default CommonImageGallery;
