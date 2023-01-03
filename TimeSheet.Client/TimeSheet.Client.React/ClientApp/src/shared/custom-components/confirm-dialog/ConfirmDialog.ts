import { custom } from "devextreme/ui/dialog";
import { formatMessage } from "devextreme/localization";
import "./confirm-dialog.scss";

const ConfirmDialog = () => {
  return custom({
    title: formatMessage("Common-ConfirmChangesTitle"),
    messageHtml: `<span>${formatMessage("Common-ConfirmChangesP1")}</span><br/><span>${formatMessage(
      "Common-ConfirmChangesP2"
    )}</span><br/><span>${formatMessage("Common-ConfirmChangesP3")}</span>`,
    buttons: [
      {
        text: formatMessage("Common-ConfirmChangesSave"),
        onClick: (e) => {
          return { buttonText: "Save" };
        },
      },
      {
        text: formatMessage("Common-ConfirmChangesDiscard"),
        onClick: (e) => {
          return { buttonText: "Discard" };
        },
      },
      {
        text: formatMessage("Common-ConfirmChangesCancel"),
        onClick: (e) => {
          return { buttonText: "Cancel" };
        },
      },
    ],
  });
};

export default ConfirmDialog;
