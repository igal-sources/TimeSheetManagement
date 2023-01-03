import { useRecoilValue } from "recoil";
import { currentLanguageStateAtom } from "recoil-states";

export const useLocaleLanguage = () => {
  const localeLanguage = useRecoilValue(currentLanguageStateAtom);
  return localeLanguage;
};
