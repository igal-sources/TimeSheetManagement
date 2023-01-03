import React, { useState } from "react";
import { formatMessage } from "devextreme/localization";
import Draggable from "react-draggable";
import ConfirmDialog from "../confirm-dialog/ConfirmDialog";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
  AppBar,
  Button,
  Paper,
  PaperProps,
} from "@mui/material";
import { useStyles } from "./CommonPopupDialogStyle";
import { ActionType } from "../../../global/enums";
import { ICommonPopupDialogProps } from "./ICommonPopupDialog";
import "./common-popup-dialog.css";

export const CommonPopupDialog = ({
  dialogTitle,
  children,
  actionType,
  showCard,
  isSubmitDisable,
  dialogPaperMinHeight,
  dialogPaperMaxHeight,
  maxWidthSize,
  onReadOnlyChanged,
  closeCard,
  confirmCard,
  handleSaveDocument,
}: ICommonPopupDialogProps) => {
  const classes = useStyles();
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  function PaperComponent(props: PaperProps) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        disabled={isFullScreen}
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }

  const onEditButtonClicked = () => {
    setIsDisabled((current: boolean) => !current);
    onReadOnlyChanged((current: boolean) => !current);
  };

  const onFullScreenClicked = () => {
    setIsFullScreen(!isFullScreen);
  };

  const onPopupHiding = () => {
    if (actionType === ActionType.VIEW) {
      closeCard();
      confirmCard();
      return;
    }

    if (!isSubmitDisable) {
      let result = ConfirmDialog();
      result.show().then((dialogResult: { buttonText: any }) => {
        console.log(dialogResult.buttonText);
        switch (dialogResult.buttonText) {
          case "Save":
            handleSaveDocument(null);
            break;
          case "Discard":
            closeCard();
            break;
          case "Cancel":
            return;
          default:
            break;
        }
      });
    } else {
      closeCard();
      confirmCard();
    }
  };

  return (
    <div>
      <Dialog
        open={showCard}
        classes={{ paper: classes.dialogPaper }}
        PaperProps={{
          style: {
            minHeight: dialogPaperMinHeight,
            maxHeight: dialogPaperMaxHeight,
          },
        }}
        maxWidth={maxWidthSize}
        fullWidth={true}
        fullScreen={isFullScreen}
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
            <IconButton edge="start" color="inherit" onClick={onFullScreenClicked} aria-label="Fullscreen">
              <FullscreenIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <div>{children}</div>
        </DialogContent>
        {actionType !== ActionType.VIEW && (
          <DialogActions className={classes.dialogActions}>
            <Button
              className={classes.dialogActions_Button}
              variant="outlined"
              disabled={isSubmitDisable}
              onClick={(e: any) => handleSaveDocument(e)}
            >
              {formatMessage("DocumentsContainer-Save")}
            </Button>
            {actionType !== ActionType.ADD && (
              <Button
                className={classes.dialogActions_Button}
                variant="outlined"
                disabled={isDisabled}
                onClick={onEditButtonClicked}
              >
                {formatMessage("DocumentsContainer-Edit")}
              </Button>
            )}
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

CommonPopupDialog.defaultProps = {
  dialogPaperMinHeight: "95vh",
  dialogPaperMaxHeight: "95vh",
  maxWidthSize: "xl",
};

export default CommonPopupDialog;
