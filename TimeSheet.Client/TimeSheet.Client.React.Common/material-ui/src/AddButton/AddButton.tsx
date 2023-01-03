import React from "react";
import { AddButtonProps } from "@rjsf/core";
import { translate } from "common-localization";

import { useMuiComponent } from "../MuiComponentContext";

const AddButton: React.FC<AddButtonProps> = (props) => {
  const { AddIcon, Button } = useMuiComponent();

  return (
    <Button {...props} color="secondary">
      <AddIcon />
      {translate("JsonForm-AddRow")}
    </Button>
  );
};

export default AddButton;
