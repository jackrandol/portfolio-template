import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { convertISODate } from '../utils/Utils';
import './Projects.css';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../actions/projects';
import ProjectForm from './ProjectForm';

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
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const toggleProjectForm = (project) => {
    toggleProjectFormVisible(!projectFormVisible);
    setSelectedProject(project);
  };

  const toggleDeleteModal = () => {
    setDeleteModalVisible(!deleteModalVisible);
  };

  const handleDeleteConfirm = (projectId) => {
    dispatch(deleteProject(projectId));
    toggleDeleteModal();
  };

  return (
    <div>
      <div className='projectsHeader'>
        <h1>Projects</h1>
        {auth && !projectFormVisible && (
          <button onClick={() => toggleProjectForm()}>add project +</button>
        )}
      </div>
      {projectFormVisible && !selectedProject && (
        <ProjectForm toggleProjectForm={toggleProjectForm} />
      )}
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
                <button onClick={toggleDeleteModal}>X</button>
                {deleteModalVisible && (
                  <div className='deleteModal'>
                    <h3>
                      Are you sure you want to delete this project forever?
                    </h3>
                    <p>
                      This will remove the project from your records and any
                      photos and videos from the database.
                    </p>
                    <h2>Project to be deleted:</h2>
                    <p>{project.title}</p>
                    <button onClick={() => handleDeleteConfirm(project._id)}>
                      delete forever
                    </button>
                    <button onClick={toggleDeleteModal}>cancel</button>
                  </div>
                )}
                <button onClick={() => toggleProjectForm(project)}>Edit</button>
              </div>
            )}
            <h1>{project.title}</h1>
            <p>description:</p>
            <p>{project.description}</p>
            <p>date:</p>
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
            {project.videos && (
              <div>
                <div className='projectVideos'>
                  {project.videos.map((video) => (
                    <div key={video.id}>
                      <video
                        src={video.url}
                        id='videos'
                        width='320'
                        height='240'
                        controls
                      >
                        Your browser doesn't support this video format.
                      </video>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
