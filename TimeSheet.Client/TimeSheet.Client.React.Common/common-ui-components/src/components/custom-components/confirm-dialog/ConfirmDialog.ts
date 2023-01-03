import { custom } from "devextreme/ui/dialog";
import { formatMessage } from "devextreme/localization";
import "./confirm-dialog.css";

const ConfirmDialog = () => {
  return custom({
    title: formatMessage("Common-ConfirmChangesTitle"),
    messageHtml: `<span>${formatMessage("Common-ConfirmChangesP1")}</span><br/><span>${formatMessage(
      "Common-ConfirmChangesP2"
    )}</span><br/><span>${formatMessage("Common-ConfirmChangesP3")}</span>`,
    buttons: [
      {
        text: formatMessage("Common-ConfirmChangesSave"),
        onClick: () => {
          return { buttonText: "Save" };
        },
      },
      {
        text: formatMessage("Common-ConfirmChangesDiscard"),
        onClick: () => {
          return { buttonText: "Discard" };
        },
      },
      {
        text: formatMessage("Common-ConfirmChangesCancel"),
        onClick: () => {
          return { buttonText: "Cancel" };
        },
      },
    ],
  });
};

export default ConfirmDialog;
