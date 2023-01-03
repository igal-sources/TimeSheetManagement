import React, { useState, useEffect, useLayoutEffect } from "react";
import { Router } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { screenNameStateAtom } from "recoil-states";
import { Button } from "devextreme-react/button";
import Toolbar, { Item as ToolbarItem } from "devextreme-react/toolbar";
import Box, { Item } from "devextreme-react/box";
import { Toast } from "devextreme-react/toast";
import { formatDate } from "devextreme/localization";
import { useLocaleLanguage } from "global/hooks";
import { heMessages, enMessages } from "common-localization";
import { locale, formatMessage, loadMessages } from "devextreme/localization";
import { useNetworkConnectivity } from "../../../utils/custom-hooks";
import "./header.scss";

export const Header = () => {
  const history = useHistory();
  const isOnline = useNetworkConnectivity();
  const localeLanguage = useLocaleLanguage();
  const [appName, setAppName] = useState<string | undefined>(formatMessage("TSM-Header-AppName"));
  const [headerDate, setHeaderDate] = useState<string | undefined>();
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

  const [screenName, setScreenName] = useRecoilState(screenNameStateAtom);

  useLayoutEffect(() => {
    loadMessages(heMessages);
    loadMessages(enMessages);
    locale(localeLanguage);
    onWorkingHoursListButtonClick();
    setAppName(formatMessage("TSM-Header-AppName"));
    setHeaderDate(formatDate(new Date(), "longDate"));
  }, []);

  useEffect(() => {
    setIsToastVisible(false);

    if (isOnline !== true) {
      setIsToastVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onWorkingHoursListButtonClick = () => {
    setScreenName(formatMessage("TSM-ScreenName-WorkingHoursList"));
    history.push("/working-hours-list");
  };

  const onCustomersListButtonClick = () => {
    setScreenName(formatMessage("TSM-ScreenName-CustomersList"));
    history.push("/customers-list");
  };

  const onProjectsListButtonClick = () => {
    setScreenName(formatMessage("TSM-ScreenName-ProjectsList"));
    history.push("/projects-list");
  };

  return (
    <Router history={history}>
      <div>
        <Toast
          visible={isToastVisible}
          message={formatMessage("Header-NoInternetConnection")}
          type="error"
          closeOnClick={true}
          closeOnOutsideClick={false}
          displayTime={15000}
          onHiding={() => setIsToastVisible(false)}
          position={"center"}
        />
        <Box direction="row" className="header-headerStyle" align="center" crossAlign="center">
          <Item ratio={1}>
            <div className="header-box-item">{headerDate}</div>
          </Item>
          <Item ratio={1} baseSize={"auto"}>
            <div className="header-box-item">{appName}</div>
          </Item>
        </Box>
        <Box direction="row" className="header-headerStyle" align="center" crossAlign="center">
          <Item ratio={1}>
            <Toolbar className="header-headerStyle toolbar-style">
              <ToolbarItem location="center" locateInMenu="auto">
                <div>
                  <Button
                    className="header-toolbar-buttons"
                    text={formatMessage("TSM-AppHeader-ToolbarWorkingHours")}
                    disabled={false}
                    onClick={onWorkingHoursListButtonClick}
                  />
                </div>
              </ToolbarItem>
              <ToolbarItem location="center" locateInMenu="auto">
                <div>
                  <Button
                    className="header-toolbar-buttons"
                    text={formatMessage("TSM-AppHeader-ToolbarCustomersList")}
                    disabled={false}
                    onClick={onCustomersListButtonClick}
                  />
                </div>
              </ToolbarItem>
              <ToolbarItem location="center" locateInMenu="auto">
                <div>
                  <Button
                    className="header-toolbar-buttons"
                    text={formatMessage("TSM-AppHeader-ToolbarProjectsList")}
                    disabled={false}
                    onClick={onProjectsListButtonClick}
                  />
                </div>
              </ToolbarItem>
            </Toolbar>
          </Item>
        </Box>
        <Box direction="row" className="header-headerStyle" align="center" crossAlign="center">
          <Item ratio={0} baseSize={"auto"}>
            <div className="header-box-item">{screenName}</div>
          </Item>
        </Box>
      </div>
    </Router>
  );
};
