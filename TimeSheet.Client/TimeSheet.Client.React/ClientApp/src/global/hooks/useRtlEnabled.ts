import { useRecoilValue } from "recoil";
import { rtlEnabledStateAtom } from "recoil-states";

export const useRtlEnabled = () => {
  const rtlEnabled = useRecoilValue(rtlEnabledStateAtom);
  return rtlEnabled;
};
