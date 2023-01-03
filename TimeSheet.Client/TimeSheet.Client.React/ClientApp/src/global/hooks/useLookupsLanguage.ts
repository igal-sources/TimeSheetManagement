import { useRecoilValue } from "recoil";
import { lookupsLanguageStateAtom } from "recoil-states";

export const useLookupsLanguage = () => {
  const lookupsLanguage = useRecoilValue(lookupsLanguageStateAtom);
  return lookupsLanguage as string;
};
