import React from 'react';
import Header from './components/header';

function App() {

  const [projects, setProjects] = React.useState(["projeto 1"]);

  function handleAddProject(){ß
    setProjects( [
        ...projects, 
        `Novo projeto ${Date.now()}`
      ]);
  }

  return (
    <>
      <Header title="Home" />

      <ul>
        {projects.map(project => (
          <li key={project}>{project}</li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  )
}

export default App;