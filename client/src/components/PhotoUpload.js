import React, { useState } from 'react';
import axios from 'axios';
import './PhotoUpload.css';

function PhotoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState();
  const [filename, setFileName] = useState('Choose file');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      delete axios.defaults.headers.common['x-auth-token'];
      await fetch('/api/photos', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error('AHHHHHHHH!! error');
    };
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Photo Uploader
        <input
          accept='.jpg,.jpeg,.png,.gif,.tiff,.tif'
          name='image'
          type='file'
          id='customeFile'
          onChange={handleFileChange}
        />
        <label htmlFor='customFile'>{filename}</label>
        <button type='submit'>Upload Image</button>
      </form>
      {uploadedFile ? (
        <div>
          <p>{uploadedFile.fileName}</p>
          <img
            className='photoPreview'
            src={uploadedFile.filePath}
            alt={uploadedFile.fileName}
          />
        </div>
      ) : null}
      {previewSource && (
        <img src={previewSource} alt='chosen' className='photoPreview' />
      )}
    </div>
  );
}

export default PhotoUpload;
