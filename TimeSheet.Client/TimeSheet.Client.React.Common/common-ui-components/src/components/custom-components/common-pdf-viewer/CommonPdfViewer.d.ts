import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
export interface PdfViewerProps {
    id: string | undefined;
    name: string | undefined;
    document: any | undefined;
    serverURL: any | undefined;
    documentWidth: number | undefined;
    documentHeight: number | undefined;
    isReadOnly: boolean;
    isRTL: boolean;
}
export declare const CommonPdfViewer: ({ id, name, document, serverURL, documentWidth, documentHeight, isReadOnly, isRTL }: PdfViewerProps) => JSX.Element;
export default CommonPdfViewer;
