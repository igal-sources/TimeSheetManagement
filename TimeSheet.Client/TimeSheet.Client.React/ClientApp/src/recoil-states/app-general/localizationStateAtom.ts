import { atom } from "recoil";
import { recoilPersist } from "recoil-states/recoilPersist";

const { persistAtom } = recoilPersist({ key: "localizationState" });

export const rtlEnabledStateAtom = atom({
  key: "rtlEnabled",
  default: true,
  effects_UNSTABLE: [persistAtom],
});

export const currentLanguageStateAtom = atom({
  key: "currentLanguage",
  default: "he-IL",
  effects_UNSTABLE: [persistAtom],
});

export const lookupsLanguageStateAtom = atom({
  key: "lookupsLanguage",
  default: "he_IL",
  effects_UNSTABLE: [persistAtom],
});
