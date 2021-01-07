import React, { useState } from 'react';
import axios from 'axios';
import './PhotoUpload.css';
import { ReactComponent as LoaderSvg } from '../assets/loader.svg';

function VideoUpload({ handleVideoUrls }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('Choose file');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    } else {
      setSelectedFile(null);
      setFileName('Choose file');
    }
    setMessage('');
  };

  const uploadVideo = async () => {
    setLoading(true);
    var formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('title', fileName);
    try {
      const result = await fetch('/api/projects/videoUpload', {
        method: 'POST',
        body: formData,
      });
      const data = await result.json();
      const videoInput = document.getElementById('videoFile');

      if (data.success) {
        handleVideoUrls(data.url, fileName, data.id);
        setMessage('File successfully uploaded!');
        setLoading(false);
        setSelectedFile(null);
        videoInput.value = null;
        setTimeout(function () {
          setMessage('');
        }, 2000);
      }
      if (data.success === false) {
        setMessage('Something went wrong with your upload!');
        setLoading(false);
        setSelectedFile(null);
        setFileName('Choose file');
        videoInput.value = null;
        setTimeout(function () {
          setMessage('');
        }, 3000);
      }
    } catch (error) {
      setMessage('Something went wrong with your upload!');
      setLoading(false);
      setSelectedFile(null);
      setFileName('Choose file');
      setTimeout(function () {
        setMessage('');
      }, 2000);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || selectedFile.size >= 4 * 1024 * 1024) {
      setMessage('File is larger than 4mb or there is no file selected');
      return;
    }
    uploadVideo();
  };

  return (
    <div className='uploaderBox'>
      <div className='uploaderBox-left'>
        Video Uploader
        <input
          accept='video/*'
          name='file'
          type='file'
          id='videoFile'
          onChange={handleFileChange}
        />
        <button onClick={handleSubmit}>Upload and Save Image</button>
      </div>
      <div className='uploaderBox-right'>
        {loading && <LoaderSvg className='spinner' />}
        {message && <div>{message}</div>}
      </div>
    </div>
  );
}

export default VideoUpload;
