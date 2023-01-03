import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  imageGallery: {
    border: "blue",
    // width: "450px",
    height: "190vh",
    marginRight: "150px",
  },
  addButton: {
    width: "30px",
    height: "25px",
    zIndex: 1,
  },
  appBar: {
    height: "50px",
    cursor: "move",
  },
  toolbar: {
    backgroundColor: "#4ab8dd",
    height: "25px",
  },
  dialogPaper: {
    minHeight: "85vh",
    maxHeight: "85vh",
  },
  dialogContent: {
    overflow: "hidden !Important",
  },
  dialogActions: {
    justifyContent: "center !Important",
  },
  dialogActions_Button: {
    width: "100px",
  },
  submit_button: {
    display: "none !Important",
  },
});
