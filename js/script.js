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

      const title = document.createElement("h2");
      title.textContent = project.title || "Untitled Project";
      div.appendChild(title);

      const description = document.createElement("p");
      description.textContent = project.description || "No description available.";
      div.appendChild(description);

      if (project.link) {
        const link = document.createElement("a");
        link.href = project.link;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = "View Project";
        div.appendChild(link);
      } else {
        const linkPlaceholder = document.createElement("span");
        linkPlaceholder.className = "project-link disabled";
        linkPlaceholder.textContent = "No link available";
        div.appendChild(linkPlaceholder);
      }

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
