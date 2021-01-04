import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { convertISODate } from '../../utils/Utils';
import './Projects.css';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../actions/projects';
import ProjectForm from '../ProjectForm';

function Projects(state) {
  let dispatch = useDispatch();
  let projectsLoading = useSelector(
    (state) => state.projects && state.projects.loading
  );
  let projects = useSelector(
    (state) => state.projects && state.projects.projects
  );
  let auth = useSelector((state) => state.auth && state.auth.isAuthenticated);

  const [projectFormVisible, toggleProjectFormVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});

  const toggleProjectForm = (project) => {
    toggleProjectFormVisible(!projectFormVisible);
    setSelectedProject(project);
  };

  const handleDelete = (projectId) => {
    dispatch(deleteProject(projectId));
  };

  return (
    <div>
      <h1>Projects</h1>
      {projectsLoading && <div>loading projects now</div>}
      {projectFormVisible && selectedProject && (
        <ProjectForm
          project={selectedProject}
          toggleProjectForm={toggleProjectForm}
        />
      )}
      {projects &&
        projects.map((project) => (
          <div key={project._id} className='projectCard'>
            {auth && (
              <div>
                <button onClick={() => handleDelete(project._id)}>X</button>
                <button onClick={() => toggleProjectForm(project)}>Edit</button>
              </div>
            )}
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <p>{convertISODate(project.date)}</p>
            {project.images &&
              project.images.map((image) => (
                <div key={image.id}>
                  <img
                    className='projectImage'
                    src={image.url}
                    alt={image.fileName}
                  ></img>
                </div>
              ))}
            <div className='linkList'>
              {project.links.length !== 0 && (
                <div>
                  <p>Links:</p>
                  {project.links.map((link) => (
                    <li key={link._id}>
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
        ))}
    </div>
  );
}

export default Projects;
