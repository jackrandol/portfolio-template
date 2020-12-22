import React, { useState, useEffect } from 'react';
import { convertISODate } from '../utils/Utils';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addProject } from '../actions/projects';

const ProjectForm = ({ project }) => {
  let dispatch = useDispatch();
  const [state, setState] = useState({
    title: '',
    description: '',
    date: '',
  });

  useEffect(() => {
    if (project) {
      setState({
        ...state,
        title: project.title,
        description: project.description,
        date: project.date,
      });
      setLinks(project.links);
    }
  });

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

  const onSubmit = (e) => {
    e.preventDefault();
    let formData = {
      title: state.title,
      description: state.description,
      date: state.date,
      links,
    };
    console.log('formData', formData);
    dispatch(addProject(formData));
  };

  return (
    <div>
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
        <ul>
          {links &&
            links.map((link) => (
              <li key={link.id}>
                <label for='link'>
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
