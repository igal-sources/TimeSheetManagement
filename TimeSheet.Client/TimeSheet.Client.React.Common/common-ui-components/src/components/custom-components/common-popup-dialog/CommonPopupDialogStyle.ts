import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  appBar: {
    height: "50px",
    cursor: "move",
  },
  toolbar: {
    backgroundColor: "#4ab8dd",
    height: "25px",
  },
  dialogPaper: {
    minHeight: "95vh",
    maxHeight: "95vh",
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
