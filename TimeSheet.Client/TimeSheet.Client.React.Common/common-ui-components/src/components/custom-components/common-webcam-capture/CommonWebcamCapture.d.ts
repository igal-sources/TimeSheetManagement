import './common-webcam-capture.css';
export interface WebcamCaptureProps {
    id: string | undefined;
    name: string | undefined;
    imageURL: string | undefined;
    retakeImageTitle: string | undefined;
    captureImageTitle: string | undefined;
    imageWidth: number | undefined;
    isReadOnly: boolean;
    confirm: (value: any) => void;
}
declare const CommonWebcamCapture: ({ id, name, imageURL, isReadOnly, retakeImageTitle, captureImageTitle, imageWidth, confirm }: WebcamCaptureProps) => JSX.Element;
export default CommonWebcamCapture;
