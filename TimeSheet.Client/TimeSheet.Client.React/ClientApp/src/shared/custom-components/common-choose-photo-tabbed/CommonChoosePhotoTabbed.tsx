import * as React from "react";
import { formatMessage } from "devextreme/localization";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import { Tab, TabPanel, TabsList } from "./CommonChoosePhotoTabbedUnstyled";
import { CommonAvatarControl, CommonWebcamCapture } from "common-ui-components";
import { ICommonChoosePhotoTabbedProps } from "./ICommonChoosePhotoTabbed";

export const CommonChoosePhotoTabbed = ({
  imageObjectKey,
  isReadOnly,
  confirmAddPhoto,
  imageInfo,
  confirmWebcamCapture,
}: ICommonChoosePhotoTabbedProps) => {
  return (
    <TabsUnstyled defaultValue={0}>
      <TabsList>
        <Tab> {formatMessage("PhotoGallery-LoadPhoto")}</Tab>
        <Tab>{formatMessage("PhotoGallery-TakePhoto")} </Tab>
        {/* <Tab>סרוק מסמך</Tab> */}
      </TabsList>
      <TabPanel value={0}>
        {
          <CommonAvatarControl
            id="AvatarControl"
            name="AvatarControl"
            avatarWidth={550}
            avatarHeight={550}
            imageURL={imageObjectKey && process.env.REACT_APP_PREFIX_IMAGE_URL + imageObjectKey}
            imageAltString={formatMessage("AvatarControl-AddPhoto")}
            isReadOnly={isReadOnly}
            confirm={(result: any, imageInfo: any) => confirmAddPhoto(result, imageInfo)}
            imageInfo={(result: any) => imageInfo(result)}
          />
        }{" "}
      </TabPanel>
      <TabPanel value={1}>
        {
          <CommonWebcamCapture
            name="undefined"
            // imageURL={process.env.REACT_APP_PREFIX_IMAGE_URL + imageURL}
            retakeImageTitle={formatMessage("PhotoGallery-RetakeImage")}
            captureImageTitle={formatMessage("PhotoGallery-Capture")}
            isReadOnly={isReadOnly}
            imageWidth={550}
            confirm={(result: any) => confirmWebcamCapture(result)}
          />
        }{" "}
      </TabPanel>
      {/* <TabPanel value={2}>סרוק מסמך</TabPanel> */}
    </TabsUnstyled>
  );
};
