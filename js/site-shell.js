document.addEventListener("DOMContentLoaded", () => {
  if (document.body && document.body.dataset.shell === "off") {
    return;
  }

  const head = document.head;
  if (head && !head.querySelector('link[href="css/site-shell.css"]')) {
    const shellStyles = document.createElement("link");
    shellStyles.rel = "stylesheet";
    shellStyles.href = "css/site-shell.css";
    head.appendChild(shellStyles);
  }

  if (document.body && !document.querySelector(".site-shell.site-header")) {
    const header = document.createElement("header");
    header.className = "site-shell site-header";
    header.innerHTML = `
      <div class="shell-inner">
        <a class="shell-brand" href="index.html">Jacob Haseman</a>
        <nav class="shell-nav" aria-label="Primary">
          <a href="index.html">Home</a>
          <a href="index.html#projects">Projects</a>
          <a href="resume.html">Resume</a>
        </nav>
      </div>
    `;
    document.body.insertAdjacentElement("afterbegin", header);
  }

  const existingFooter = document.querySelector("footer");
  if (existingFooter) {
    existingFooter.classList.add("site-shell", "site-footer");
    if (!existingFooter.querySelector(".shell-inner")) {
      const wrapper = document.createElement("div");
      wrapper.className = "shell-inner";
      while (existingFooter.firstChild) {
        wrapper.appendChild(existingFooter.firstChild);
      }
      existingFooter.appendChild(wrapper);
    }
    return;
  }

  if (document.body) {
    const footer = document.createElement("footer");
    footer.className = "site-shell site-footer";
    const year = new Date().getFullYear();
    footer.innerHTML = `
      <div class="shell-inner">
        <p>© ${year} Jacob T. Haseman. All rights reserved.</p>
      </div>
    `;
    document.body.appendChild(footer);
  }
});
