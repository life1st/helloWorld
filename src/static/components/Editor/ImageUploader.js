import React, { useRef } from 'react'
import FormData from 'form-data'
import { API } from '../../utils/Api'

const ImageUploader = ({
  onUploaded = () => {}
}) => {
  const inputRef = useRef()
  const handleUpload = () => {
    const files = inputRef.current.files
    if (files && files.length > 0) {
      // const data = new FormData()
      // data.append('file', files[0], files[0].name)
      // API.uploadImage({
      //   formData: data
      // }).then(data => {
      //   console.log(data)
      //   onUploaded(data)
      // })
      onUploaded({
        url: 'test.'
      })
    }
  }

  const handleImageClick = () => {
    inputRef.current.click()
  }

  return (
    <span>
      <button onClick={handleImageClick}>Image</button>
      <input
        style={{display: 'none'}}
        ref={inputRef}
        type="file"
        onChange={handleUpload}
      />
    </span>
  )
}

export default ImageUploader
