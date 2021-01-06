import React, { useState, useEffect } from 'react';
import { convertISODate } from '../utils/Utils';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  addProject,
  setProjectsLoading,
  updateProject,
} from '../actions/projects';
import './ProjectForm.css';
import PhotoUpload from './PhotoUpload';
import VideoUpload from './VideoUpload';
import axios from 'axios';
import { ReactComponent as LoaderSvg } from '../assets/loader.svg';

const ProjectForm = ({ toggleProjectForm, project }) => {
  let dispatch = useDispatch();
  const [imageUrls, setImageUrls] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [error, setError] = useState('');
  const [imagesLoading, setImagesLoading] = useState(false);
  const [savedProject, setSavedProject] = useState();

  const [state, setState] = useState({
    title: '',
    description: '',
    date: '',
  });

  useEffect(() => {
    if (project) {
      setState({
        id: project._id,
        title: project.title,
        description: project.description,
        date: convertISODate(project.date),
      });
      setLinks(project.links);
      setImageUrls(project.images);
    }
  }, [project]);

  const [links, setLinks] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError('');
  };

  const addLink = (e) => {
    e.preventDefault();
    const newID = uuidv4();
    let newLinks = [...links, { id: newID, link: '' }];
    setLinks(newLinks);
  };

  const handleLink = (e, id) => {
    const linkIndex = links.findIndex((link) => link.id === id);

    const updatedLink = {
      ...links[linkIndex],
      [e.target.name]: e.target.value,
    };

    const updatedLinks = [
      ...links.slice(0, linkIndex),
      updatedLink,
      ...links.slice(linkIndex + 1),
    ];
    setLinks(updatedLinks);
  };

  const deleteLink = (linkID) => {
    let updatedLinks = links.filter(function (link) {
      return link.id !== linkID;
    });
    setLinks(updatedLinks);
  };

  const handleImageUrls = (url, fileName, id) => {
    let newImageUrlsArray;
    if (imageUrls.length === 0) {
      newImageUrlsArray = [{ id, url, fileName }];
    } else {
      newImageUrlsArray = [...imageUrls, { id, url, fileName }];
    }
    setImageUrls(newImageUrlsArray);
  };

  const handleVideoUrls = (url, fileName, id) => {
    let newVideoUrlsArray;
    if (videoUrls.length === 0) {
      newVideoUrlsArray = [{ id, url, fileName }];
    } else {
      newVideoUrlsArray = [...imageUrls, { id, url, fileName }];
    }
    setVideoUrls(newVideoUrlsArray);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (state.title === '' || state.description === '' || state.date === '') {
      setError('Title, description and date are all required');
      return;
    }
    let formData = {
      title: state.title,
      description: state.description,
      date: state.date,
      links: links,
      images: imageUrls,
    };
    if (project) {
      formData._id = state.id;
      dispatch(setProjectsLoading());
      dispatch(updateProject(formData));
    } else {
      dispatch(setProjectsLoading());
      dispatch(addProject(formData));
    }
    setSavedProject(formData);
  };

  const closeForm = () => {
    toggleProjectForm();
    setError('');
    setSavedProject(null);
  };

  const deleteImage = async (cloudinaryID) => {
    let data = { public_id: cloudinaryID };
    setImagesLoading(true);
    try {
      axios.post(`/api/projects/deleteImage`, data);
      let newImageUrlsArray = imageUrls.filter(
        (url) => url.id !== cloudinaryID
      );
      setImageUrls(newImageUrlsArray);
      setImagesLoading(false);
    } catch (error) {
      console.log(error);
      setImagesLoading(false);
      setError('image deletion failed');
    }
  };

  return (
    <div className='projectFormModal'>
      <button className='closeModal' onClick={closeForm}>
        X
      </button>
      {savedProject ? (
        <div>
          <div>Project saved!</div>

          <div className='projectCard'>
            <h1>{savedProject.title}</h1>
            <p>{savedProject.description}</p>
            <p>{convertISODate(savedProject.date)}</p>
            <div className='projectImages'>
              {savedProject.images &&
                savedProject.images.map((image) => (
                  <div key={image.id}>
                    <img
                      className='projectImage'
                      src={image.url}
                      alt={image.fileName}
                    ></img>
                  </div>
                ))}
            </div>
            <div className='linkList'>
              {savedProject.links.length !== 0 && (
                <div>
                  <p>Links</p>
                  {savedProject.links.map((link) => (
                    <li key={link.id}>
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={link.link}
                      >
                        {link.link}
                      </a>
                    </li>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <form className='projectForm' onSubmit={(e) => onSubmit(e)}>
          <h1>Create a New Project:</h1>
          {error && <p className='alert'>{error}</p>}
          <input
            type='text'
            name='title'
            value={state.title}
            placeholder='title'
            onChange={handleChange}
          ></input>
          <input
            type='date'
            name='date'
            value={state.date}
            onChange={handleChange}
          ></input>
          <textarea
            type='text'
            name='description'
            value={state.description}
            placeholder='description'
            onChange={handleChange}
          ></textarea>
          {imageUrls.length > 0 && (
            <div>
              <div>Uploaded Images:</div>
              <div className='projectImages'>
                {imagesLoading && <LoaderSvg className='spinner' />}
                {imageUrls.map((image) => (
                  <div key={image.id}>
                    <img
                      className='photoPreview'
                      src={image.url}
                      alt={image.fileName}
                    />
                    <button onClick={() => deleteImage(image.id)}>x</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <PhotoUpload handleImageUrls={handleImageUrls} />
          <VideoUpload handleVideoUrls={handleVideoUrls} />
          <ul>
            {links && (
              <div>
                <p>external project link: (must begin with http or https)</p>
                {links.map((link) => (
                  <li className='externalLinkInput' key={link.id}>
                    <input
                      name='link'
                      type='text'
                      defaultValue={link.link}
                      onChange={(e) => handleLink(e, link.id)}
                    ></input>
                    <button onClick={() => deleteLink(link.id)}>X</button>
                  </li>
                ))}
              </div>
            )}
          </ul>
          <button onClick={addLink}>add link</button>
          <input className='buttonSubmit' type='submit' value='Save Project' />
        </form>
      )}
    </div>
  );
};

export default ProjectForm;
