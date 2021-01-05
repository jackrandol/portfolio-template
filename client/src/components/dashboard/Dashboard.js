import React, { useState } from 'react';
import ProjectForm from '../ProjectForm';

function Dashboard() {
  const [projectFormVisible, setProjectFormVisible] = useState(false);

  const toggleProjectForm = () => {
    setProjectFormVisible(!projectFormVisible);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {!projectFormVisible && (
        <button onClick={toggleProjectForm}>Add Project</button>
      )}
      {projectFormVisible && (
        <div>
          <ProjectForm toggleProjectForm={toggleProjectForm} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
