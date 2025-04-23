// JavaScript to enable search filtering for the project sections
document.getElementById("searchInput").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const projects = document.querySelectorAll(".project");
  
    projects.forEach(project => {
      const text = project.innerText.toLowerCase();
      project.style.display = text.includes(query) ? "block" : "none";
    });
  });
  