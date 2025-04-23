// Load project data from JSON
fetch('data/projects.json')
  .then(response => response.json())
  .then(projects => {
    const container = document.getElementById('projects');
    projects.forEach(proj => {
      const div = document.createElement('div');
      div.className = 'project';
      div.innerHTML = `
        <h2>${proj.title}</h2>
        <p>${proj.description}</p>
        <a href="${proj.link}" target="_blank">View Project</a>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => console.error('Error loading project data:', error));
