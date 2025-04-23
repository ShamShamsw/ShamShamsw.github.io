document.addEventListener("DOMContentLoaded", () => {
  const projectSection = document.getElementById("projects");
  const searchInput = document.getElementById("searchInput");

  if (!projectSection || !searchInput) {
    console.error("Required DOM elements are missing.");
    return;
  }

  let allProjects = [];

  // Load and display projects from JSON
  fetch("data/projects.json")
    .then((res) => res.json())
    .then((projects) => {
      allProjects = projects;
      displayProjects(allProjects);
    })
    .catch((err) => console.error("Failed to load projects:", err));

  // Render the project list
  function displayProjects(projects) {
    const projectSection = document.getElementById("projects");
    projectSection.innerHTML = ""; // Clear existing content
  
    projects.forEach((project) => {
      const div = document.createElement("div");
      div.className = "project";
      div.innerHTML = `
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <a href="project-template.html?title=${encodeURIComponent(project.title)}" target="_blank">View Project</a>
      `;
      projectSection.appendChild(div);
    });
  }

  // Filter projects by search query
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = allProjects.filter((project) => {
      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query)
      );
    });
    displayProjects(filtered);
  });
});
