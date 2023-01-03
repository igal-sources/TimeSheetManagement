import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    border: "1px solid #ab47bc",
    height: "100vh",
    margin: "0 auto",
    textAlign: "center",
    marginTop: "60px",
    overflow: "auto",
  },
  imageGallery: {
    border: "blue",
    // width: "450px",
    height: "190vh",
    marginRight: "150px",
  },
  addButton: {
    width: "30px",
    height: "25px",
    zIndex: 1
  },
});