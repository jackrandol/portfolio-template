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
      console.log('fileName', fileName);
      setMessage('');
    }
  };

  const uploadVideo = async () => {
    var formData = new FormData();
    console.log('selectedFile', selectedFile);
    formData.append('file', selectedFile);
    formData.append('title', fileName);
    try {
      var instance = axios.create();
      delete instance.defaults.headers.common['x-auth-token'];
      const res = await axios.post('/api/projects/videoUpload', formData);
      const data = await res.json();

      handleVideoUrls(data.url, fileName, data.id);
      setMessage('File successfully uploaded!');
      setLoading(false);
      setSelectedFile(null);
      setTimeout(function () {
        setMessage('');
      }, 2000);
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
    uploadVideo(selectedFile);
  };

  return (
    <div className='uploaderBox'>
      <div className='uploaderBox-left'>
        Video Uploader
        <input
          accept='video/*'
          name='video'
          type='file'
          id='customeFile'
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
