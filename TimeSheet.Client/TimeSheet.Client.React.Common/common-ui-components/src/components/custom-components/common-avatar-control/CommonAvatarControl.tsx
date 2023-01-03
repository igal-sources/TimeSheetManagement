import React, { useState, useEffect, useRef } from 'react'
import EXIF from 'exif-js'
import { ICommonAvatarControlProps } from '../../../global/interfaces'
import './common-avatar-control.css'

export const CommonAvatarControl = ({
  id,
  name,
  avatarWidth = 200,
  avatarHeight = 200,
  imageURL = '',
  imageAltString = 'photo',
  isReadOnly = false,
  confirm,
  imageInfo
}: ICommonAvatarControlProps) => {
  const [image, setImage] = useState<any>()
  const [preview, setPreview] = useState<any>('')
  const fileInputRef = useRef() as React.MutableRefObject<HTMLInputElement>

  console.log(id, name)
  let exifData: any

  useEffect(() => {
    if (image) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        confirm(reader.result, exifData)
      }
      reader.readAsDataURL(image)
    } else if (imageURL) {
      setPreview(imageURL)
    } else {
      setPreview(null)
    }
  }, [imageURL, confirm, image])

  return (
    <div className='avatar-container'>
      <form>
        <img
          className='avatar-button'
          src={preview}
          alt={imageAltString}
          style={{
            display: 'flex',
            width: avatarWidth,
            height: avatarHeight,
            cursor: isReadOnly ? 'auto' : 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            border: '1px solid rgb(75, 63, 63)',
            lineHeight: '200px',
            textAlign: 'center',
            objectFit: 'contain',
            background: '#f1f1eb'
          }}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        />
        <input
          type='file'
          style={{ display: 'none' }}
          disabled={isReadOnly}
          ref={fileInputRef}
          accept='image/*'
          onChange={(event: any) => {
            const file = event.target.files[0]
            if (file && file.size > 5000000) {
              alert('File is too big!')
              file.value = ''
            } else {
              if (file && file.type.substring(0, 5) === 'image') {
                setImage(file)
                EXIF.getData(file, () => {
                  let exifData = EXIF.getAllTags(file)
                  if (exifData && Object.keys(exifData).length > 0) {
                    console.log('EXIF data', exifData)
                    imageInfo(exifData)
                  } else {
                    console.log(
                      "No EXIF data found in image '" + file.name + "'."
                    )
                  }
                })
              } else {
                setImage(null)
              }
            }
          }}
        />
      </form>
    </div>
  )
}

CommonAvatarControl.defaultProps = {
  id: 'avatar',
  name: 'avatar',
  imageInfo: () => void {}
}

export default CommonAvatarControl
