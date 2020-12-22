import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProjectForm from '../ProjectForm';

function Dashboard() {
  const [projectFormVisible, setProjectFormVisible] = useState(false);
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => setProjectFormVisible(!projectFormVisible)}>
        Add Project
      </button>
      {projectFormVisible && (
        <div>
          <button onClick={() => setProjectFormVisible(!projectFormVisible)}>
            X
          </button>
          <ProjectForm />
        </div>
      )}
    </div>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
