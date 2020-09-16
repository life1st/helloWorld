import React from 'react'
import ImageUploader from './ImageUploader'

const ToolBar = ({
  onImageUpload = () => {}
}) => {
  const handleImageUploaded = (data) => onImageUpload(data)

  return (
    <div>
      <ImageUploader
        onUploaded={handleImageUploaded}
      />
    </div>
  )
}

export default ToolBar
