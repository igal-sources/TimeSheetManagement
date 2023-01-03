import './common-signature-pad.css';
export interface SignaturePadProps {
    id: string | undefined;
    name: string | undefined;
    signatureURL: string | undefined;
    signaturePopupTitle: string | undefined;
    signatureButtonSave: string | undefined;
    signatureButtonClear: string | undefined;
    signatureButtonClose: string | undefined;
    isRTL: boolean;
    showSignaturePad: boolean;
    closeSignaturePad: () => void;
    confirmSignaturePad: (value: any) => void;
}
declare const CommonSignaturePad: ({ id, name, signatureURL, signaturePopupTitle, signatureButtonSave, signatureButtonClear, signatureButtonClose, isRTL, showSignaturePad, closeSignaturePad, confirmSignaturePad }: SignaturePadProps) => JSX.Element;
export default CommonSignaturePad;
