import React from "react";
import { LoadPanel } from "devextreme-react/load-panel";
import { ICommonLoadingPanelProps } from "./ICommonLoadingPanel";

const CommonLoadingPanel = ({
  className,
  message,
  position,
  visible,
  withIndicator,
  withOverlay,
  withPaneBorder,
  hideOnOutsideClick,
  onHiding,
}: ICommonLoadingPanelProps) => {
  return (
    <div>
      <LoadPanel
        className={className}
        shadingColor="rgba(0,0,0,0.4)"
        position={position}
        onHiding={onHiding}
        message={message}
        visible={visible}
        showIndicator={withIndicator}
        shading={withOverlay}
        showPane={withPaneBorder}
        hideOnOutsideClick={hideOnOutsideClick}
      />
    </div>
  );
};

CommonLoadingPanel.defaultProps = {
  withIndicator: true,
  withOverlay: true,
  withPaneBorder: true,
  className: "",
  message:"Loading...",
  hideOnOutsideClick: false,
};

export default CommonLoadingPanel;
