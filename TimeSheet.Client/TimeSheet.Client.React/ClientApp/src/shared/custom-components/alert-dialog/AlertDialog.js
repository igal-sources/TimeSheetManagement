import { alert } from "devextreme/ui/dialog";
import { errors as lookupErrors } from "common-localization";
import { useLookupsLanguage, useRtlEnabled } from "global/hooks";
import { isEmpty } from "global/types";
import "./alert-dialog.scss";

const AlertDialog = (errorId, responseData, title) => {
  const isRtlEnabled = useRtlEnabled();
  const lookupsLanguage = useLookupsLanguage();
  const selectedError = getById(errorId);
  let messageHtml = "";
  const { errors = {} } = responseData || {};
  console.log("errors: ", errors);

  const json2ToHtml = (json) => {
    let text =
      "<style>table, th, td { direction:ltr; border: 1px solid black; border-collapse: collapse; text-align: left; } th { text-align: center; } </style><table><tr><th>Instance</th><th>Error</th></tr>";
    for (let x in json) {
      text += "<tr><td>" + json[x].fieldName + "</td><td>" + json[x].errorMessage + "</td></tr>";
    }
    text += "</table>";

    return text;
  };

  if (!isEmpty(errors)) {
    messageHtml = "<body>" + json2ToHtml(errors) + "</body>";
  } else {
    messageHtml = `<div style='text-align:${isRtlEnabled ? "right" : "left"}; width:500px'>${
      selectedError[0][lookupsLanguage]
    }</div>`;
  }

  return alert(messageHtml, title);

  function getById(idToSearch) {
    return lookupErrors.filter((item) => {
      return item.id === idToSearch;
    });
  }
};

export default AlertDialog;
