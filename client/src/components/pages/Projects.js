import React from 'react';
import { useSelector } from 'react-redux';
import { convertISODate } from '../../utils/Utils';
import './Projects.css';

function Projects(state) {
  let projectsLoading = useSelector(
    (state) => state.projects && state.projects.loading
  );
  let projects = useSelector(
    (state) => state.projects && state.projects.projects
  );
  return (
    <div>
      <h1>Projects</h1>
      {projectsLoading && <div>loading projects now</div>}

      {projects &&
        projects.map((project) => (
          <div key={project._id} className='projectCard'>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <p>{convertISODate(project.date)}</p>
            <div className='linkList'>
              Links:
              {project.links &&
                project.links.map((link) => (
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
          </div>
        ))}
    </div>
  );
}

export default Projects;
