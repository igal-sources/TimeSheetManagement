import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import React, { useEffect, useLayoutEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { rtlEnabledStateAtom, currentLanguageStateAtom, lookupsLanguageStateAtom } from "recoil-states";
import config from "devextreme/core/config";
import { Header } from "./components/main-container/header/Header";
import { AppMain } from "components/main-container/app-main/AppMain";
import Box, { Item } from "devextreme-react/box";
import { heMessages, enMessages } from "common-localization";
import { locale, loadMessages, formatMessage } from "devextreme/localization";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { prefixer } from "stylis";
import "./App.scss";

const cacheLtr = createCache({ key: "muiltr" });
const cacheRtl = createCache({ key: "muirtl", stylisPlugins: [prefixer, rtlPlugin] });
const ltrTheme = createTheme({ direction: "ltr" });
const rtlTheme = createTheme({ direction: "rtl" });

const App = () => {
  const [rtlEnabled, setRtlEnabled] = useRecoilState(rtlEnabledStateAtom);
  const [localLanguage, setLocalLanguage] = useRecoilState(currentLanguageStateAtom);
  const setLookupsLanguage = useSetRecoilState(lookupsLanguageStateAtom);

  const alertUser = (ev: { preventDefault: () => void }) => {
    console.log("useBeforeunload: ", ev);
    ev.preventDefault();
    return; // (ev.returnValue = "Are you sure you want to close?");
  };

  const changeLanguage = (lng: string) => {
    console.log("changeLanguage to: ", lng);
    setLocalLanguage(lng);
    setLookupsLanguage(getLookupsLanguage(localLanguage as string));
    window.location.href = window.location.href;
  };

  const getLookupsLanguage = (language: string): string => {
    // console.log("getLookupsLanguage: ", language);
    switch (language) {
      case "en-US":
        return "en_US";
      case "he-IL":
        return "he_IL";
      default:
        return "";
    }
  };

  const updateLocalization = () => {
    let isRTL = localLanguage === "he-IL" ? true : false;

    setRtlEnabled(isRTL);
    const dir = isRTL ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = localLanguage;
    document.body.dir = dir;

    localStorage.setItem("locale", localLanguage as string);
    setLookupsLanguage(getLookupsLanguage(localLanguage));

    console.log("STARTED-RTL: ", dir);
    console.log("STARTED-LOCAL-LANGUAGE: ", localLanguage);
    console.log("STARTED-LOOKUPS-LANGUAGE: ", getLookupsLanguage(localLanguage));
    config({
      rtlEnabled: isRTL,
    });
  };

  useLayoutEffect(() => {
    updateLocalization();
  }, []);

  useEffect(() => {
    loadMessages(heMessages);
    loadMessages(enMessages);
    updateLocalization();

    setLocalLanguage("he-IL");
    setLookupsLanguage(getLookupsLanguage(localLanguage));
    locale(localLanguage as string);
    window.addEventListener("beforeunload", alertUser);

    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App-main">
      <div className="App-header">
        <Header />
      </div>
      <div className="App-content">
        <CacheProvider value={rtlEnabled ? cacheRtl : cacheLtr}>
          <ThemeProvider theme={rtlEnabled ? rtlTheme : ltrTheme}>
            <CssBaseline />
            <AppMain />
          </ThemeProvider>
        </CacheProvider>
      </div>
      <div className="App-footer">
        <Box direction="row" className="footer-container" align="center" crossAlign="center">
          <Item ratio={2}>
            <div className="footer-version">
              <div>
                {formatMessage("App-Version")}: {process.env.REACT_APP_APP_VERSION_NUMBER}
              </div>
            </div>
          </Item>
          <Item ratio={1}>
            <div className="footer-container">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div className="footer-buttons-container">
                <button className="footer-btn-bot-en" onClick={() => changeLanguage("en-US")}>
                  English
                </button>
                <button className="footer-btn-bot-he" onClick={() => changeLanguage("he-IL")}>
                  עברית
                </button>
              </div>
            </div>
          </Item>
          <Item ratio={2}>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
          </Item>
        </Box>
      </div>
    </div>
  );
};

export default App;
