import React, { useState } from 'react';
import axios from 'axios';
import './PhotoUpload.css';

function PhotoUpload({ handleImageUrls }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState();
  const [fileName, setFileName] = useState('Choose file');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
    previewFile(file);
    setMessage('');
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
      var instance = axios.create();
      delete instance.defaults.headers.common['x-auth-token'];
      const res = await fetch('/api/projects/imageUpload', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      handleImageUrls(data.url, fileName, data.id);
      setMessage('File successfully uploaded!');
      setLoading(false);
      setSelectedFile(null);
      setPreviewSource();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || selectedFile.size >= 4 * 1024 * 1024) {
      setMessage('File is larger than 4mb or there is no file selected');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setLoading(true);
      uploadImage(reader.result);
      const fileInput = document.getElementById('customeFile');
      fileInput.value = null;
    };
    reader.onerror = () => {
      setLoading(false);
      setMessage('something went wrong with your file upload');
      console.error('AHHHHHHHH!! error');
    };
  };

  return (
    <div>
      <div>
        Photo Uploader
        {loading && <div>Image is Uploading . . . </div>}
        {message && <div>{message}</div>}
        <input
          accept='.jpg,.jpeg,.png,.gif,.tiff,.tif'
          name='image'
          type='file'
          id='customeFile'
          onChange={handleFileChange}
        />
        <button onClick={handleSubmit}>Upload Image</button>
      </div>
      {previewSource && (
        <div>
          <p>preview image</p>
          <img src={previewSource} alt='chosen' className='photoPreview' />
        </div>
      )}
    </div>
  );
}

export default PhotoUpload;
