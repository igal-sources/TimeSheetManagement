import { atom } from "recoil";
import { recoilPersist } from "recoil-states/recoilPersist";

const { persistAtom } = recoilPersist({ key: "applicationState" });

export const screenNameStateAtom = atom({
  key: "screenName",
  default: "Screen Name",
  effects_UNSTABLE: [persistAtom],
});