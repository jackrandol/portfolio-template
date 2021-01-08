import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAbout, updateAboutImage } from '../actions/about';
import PhotoUpload from './PhotoUpload';
import './About.css';

function About() {
  let auth = useSelector((state) => state.auth && state.auth.isAuthenticated);
  let about = useSelector((state) => state.about && state.about);
  let dispatch = useDispatch();
  const [editVisible, setEditVisible] = useState(false);
  const [buttonText, setButtonText] = useState('edit');
  const [editImageButton, setEditImageButton] = useState('edit image');
  const [bio, setBio] = useState('');
  const [aboutImageUrl, setAboutImageUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [imageUploaderVisible, setImageUploaderVisible] = useState(false);

  useEffect(() => {
    setBio(about.bio);
    setAboutImageUrl(about.image.url);
  }, [about]);

  useEffect(() => {
    if (editVisible) {
      setButtonText('save text');
    }
    if (!editVisible) {
      setButtonText('edit text');
    }
  }, [editVisible]);

  useEffect(() => {
    if (imageUploaderVisible) {
      setEditImageButton('close image editor');
    }
    if (!imageUploaderVisible) {
      setEditImageButton('edit image');
    }
  }, [imageUploaderVisible]);

  const toggleEdit = () => {
    if (buttonText === 'save text') {
      let formData = {
        bio: bio,
        _id: about.id,
      };
      dispatch(addAbout(formData));
      setEditVisible(!editVisible);
    }
    setEditVisible(!editVisible);
  };

  const handleBio = (e) => {
    e.preventDefault();
    setBio(e.target.value);
  };

  const handleAboutImage = (url, fileName, id) => {
    let aboutImageObject = { id, url, fileName };
    let formData = {
      image: aboutImageObject,
      _id: about.id,
    };
    console.log('formData', formData);
    dispatch(updateAboutImage(formData));
    setFileName(fileName);
    setAboutImageUrl(url);
  };

  const toggleEditImage = () => {
    setImageUploaderVisible(!imageUploaderVisible);
  };

  return (
    <div>
      <h1>About Page</h1>
      {aboutImageUrl && (
        <img className='aboutImage' src={aboutImageUrl} alt={fileName}></img>
      )}
      {auth && <button onClick={toggleEditImage}>{editImageButton}</button>}
      {imageUploaderVisible && (
        <div>
          <PhotoUpload handleImageUrls={handleAboutImage} />
        </div>
      )}
      {editVisible && (
        <textarea
          type='text'
          name='bio'
          value={bio}
          onChange={handleBio}
        ></textarea>
      )}
      {!editVisible && <p>{bio}</p>}
      {auth && <button onClick={toggleEdit}>{buttonText}</button>}
    </div>
  );
}

export default About;
