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

const ProjectForm = ({ toggleProjectForm, project }) => {
  let dispatch = useDispatch();
  const [imageUrls, setImageUrls] = useState([]);

  const [state, setState] = useState({
    title: '',
    description: '',
    date: '',
  });

  useEffect(() => {
    if (project) {
      setState({
        ...state,
        id: project._id,
        title: project.title,
        description: project.description,
        date: convertISODate(project.date),
      });
      setLinks(project.links);
      setImageUrls(project.images);
    }
  }, []);

  const [links, setLinks] = useState([{ id: '1', link: '' }]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
    let newImageUrlsArray = [...imageUrls, { id, url, fileName }];
    setImageUrls(newImageUrlsArray);
    console.log(newImageUrlsArray);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let formData = {
      id: state.id,
      title: state.title,
      description: state.description,
      date: state.date,
      links: links,
      images: imageUrls,
    };
    console.log('formData', formData);
    if (project) {
      dispatch(updateProject(formData));
    } else {
      dispatch(addProject(formData));
    }
  };

  return (
    <div className='projectForm'>
      <button onClick={toggleProjectForm}>X</button>
      <form onSubmit={(e) => onSubmit(e)}>
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
        <input
          type='text'
          name='description'
          value={state.description}
          placeholder='description'
          onChange={handleChange}
        ></input>
        {imageUrls && (
          <div>
            <div>Uploaded Images</div>
            {imageUrls.map((image) => (
              <img
                key={image.id}
                className='photoPreview'
                src={image.url}
                alt={image.fileName}
              />
            ))}
          </div>
        )}
        <PhotoUpload handleImageUrls={handleImageUrls} />
        <ul>
          {links &&
            links.map((link) => (
              <li key={link.id}>
                <label htmlFor='link'>
                  external project link: (must begin with http or https)
                </label>
                <input
                  name='link'
                  type='text'
                  defaultValue={link.link}
                  onChange={(e) => handleLink(e, link.id)}
                ></input>
                <button onClick={() => deleteLink(link.id)}>X</button>
              </li>
            ))}
        </ul>
        <button onClick={addLink}>add link</button>
        <input type='submit' value='Save Project' />
      </form>
    </div>
  );
};

export default ProjectForm;
