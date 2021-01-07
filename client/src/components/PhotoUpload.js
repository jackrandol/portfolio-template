import React, { useState } from 'react';
import axios from 'axios';
import './PhotoUpload.css';
import { ReactComponent as LoaderSvg } from '../assets/loader.svg';

function PhotoUpload({ handleImageUrls }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState();
  const [fileName, setFileName] = useState('Choose file');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      previewFile(file);
      setMessage('');
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    setLoading(true);
    try {
      const res = await fetch('/api/projects/imageUpload', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (res.status === 200) {
        handleImageUrls(data.url, fileName, data.id);
        setMessage('File successfully uploaded!');
        setLoading(false);
        setSelectedFile(null);
        setPreviewSource(null);
        setTimeout(function () {
          setMessage('');
        }, 2000);
      }
      if (res.status === 500) {
        setMessage('Something went wrong with upload!');
        setLoading(false);
        setSelectedFile(null);
        setPreviewSource(null);
        setTimeout(function () {
          setMessage('');
        }, 2000);
      }
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
      uploadImage(reader.result);
      const fileInput = document.getElementById('customeFile');
      fileInput.value = null;
    };
    reader.onerror = () => {
      setLoading(false);
      setMessage('something went wrong with your file upload');
    };
  };

  return (
    <div className='uploaderBox'>
      <div className='uploaderBox-left'>
        Photo Uploader
        <input
          accept='.jpg,.jpeg,.png,.gif,.tiff,.tif'
          name='image'
          type='file'
          id='customeFile'
          onChange={handleFileChange}
        />
        <button onClick={handleSubmit}>Upload and Save Image</button>
      </div>
      <div className='uploaderBox-right'>
        {previewSource && !loading && (
          <div>
            <p>preview image</p>
            <img src={previewSource} alt='chosen' className='photoPreview' />
          </div>
        )}
        {loading && <LoaderSvg className='spinner' />}
        {message && <div>{message}</div>}
      </div>
    </div>
  );
}

export default PhotoUpload;
