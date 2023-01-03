//npm install pdfjs-dist@2.11.338
//npm install @react-pdf-viewer/core@3.0.0
//npm install @react-pdf-viewer/default-layout
import React, { useState, useEffect, Fragment } from 'react'
import { Viewer, TextDirection } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { Worker } from '@react-pdf-viewer/core'
import { isEmpty } from '../../../shared/types-checker'
import { ICommonPdfViewerProps } from '../../../global/interfaces'

export const CommonPdfViewer = ({
  name,
  document,
  serverURL,
  PdfFileErrorTitle = 'Please select valid pdf file',
  PdfFileInstruction = 'No pdf file selected',
  documentWidth = 500,
  documentHeight = 500,
  isReadOnly = false,
  isRTL = true
}: ICommonPdfViewerProps) => {

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const [pdfFile, setPdfFile] = useState<any>(null)
  const [pdfFileError, setPdfFileError] = useState<string | undefined>('')
  const [viewPdf, setViewPdf] = useState<any>(null)

  const fileType = ['application/pdf']

  console.log('serverURL, imageURL', pdfFile)

  useEffect(() => {
    if (!isEmpty(document)) {
      const { formData: { imageURL = [] } = {} } = document || {}

      setPdfFile(serverURL + imageURL)
      setViewPdf(serverURL + imageURL)
      console.log('isEmpty-document: ', document)
    } else {
      setViewPdf(null)
    }
  }, [document, isReadOnly])

  const handlePdfFileChange = (e: any) => {
    let selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onloadend = (e: any) => {
          setPdfFile(e.target.result)
          setViewPdf(e.target.result)
          document.formData.imageBase64Binary = e.target.result
          setPdfFileError('')
        }
      } else {
        setPdfFile('../../../assets/pdf/blank-pdf.pdf')
        setViewPdf(null)
        setPdfFileError(PdfFileErrorTitle)
      }
    } else {
      console.log('select your file')
    }
  }

  return (
    <div className='container'>
      <br></br>
      <input
        name={name}
        type='file'
        disabled={isReadOnly}
        className='form-control'
        required
        onChange={handlePdfFileChange}
      />
      {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
      <br></br>
      <br></br>
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          width: documentWidth,
          height: documentHeight,
          flexGrow: 1,
          overflow: 'auto'
        }}
      >
        {viewPdf && (
          <Fragment>
            <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js'>
              <Viewer
                theme={{
                  direction: isRTL
                    ? TextDirection.RightToLeft
                    : TextDirection.LeftToRight
                }}
                fileUrl={pdfFile}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          </Fragment>
        )}

        {/* if we don't have pdf or viewPdf state is null */}
        {!viewPdf && <Fragment>{PdfFileInstruction}</Fragment>}
      </div>
    </div>
  )
}

export default CommonPdfViewer
