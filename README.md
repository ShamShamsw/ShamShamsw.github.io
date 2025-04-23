# 🎓 Personal Portfolio Website - Jacob Haseman

A modern, responsive portfolio website built with HTML, CSS (SASS), and JavaScript. Designed to showcase educational background, work experience, and featured projects with a searchable interface. Built for scalability and easy deployment, including AWS S3 integration for file uploads.

---

## 🧠 About

This website serves as a digital portfolio to highlight my skills in IT, software development, machine learning, and business analysis. It includes key sections such as:

- A bold, animated introduction
- About Me & Education
- Work Experience
- Project Highlights (dynamically loaded)
- Resume link
- Search functionality
- AWS S3 upload-ready folder

---

## 📁 Project Structure

```plaintext
GitRepo/
│
├── index.html                # Main website
├── resume.html               # Resume landing page (optional)
│
├── /css/
│   └── style.css             # Compiled main stylesheet
│
├── /sass/
│   └── style.scss            # SASS source for styling
│
├── /js/
│   └── script.js             # JavaScript for interactivity and search
│
├── /data/
│   └── projects.json         # JSON file containing project data
│
├── /fonts/                   # Web-safe or custom fonts
│
├── /images/
│   ├── placeholder.jpg       # Placeholder profile image
│   ├── email-icon.svg
│   ├── linkedin-icon.svg
│   └── github-icon.svg
│
├── /upload/                  # AWS S3 upload folder (if implemented)
│
└── README.md                 # This file

# 🚀 Features

* Responsive two-column hero section

* Dynamic color transition as you scroll

* Searchable project section

* JSON-driven project rendering

* Clean, accessible typography

* AWS S3-ready upload structure

# 📦 Getting Started

1. Clone the repository

git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

2. Edit the content in:

* index.html for your personal info and layout

* projects.json for your dynamic project list

* style.scss for custom styles

3. Compile the SASS:

index.html for your personal info and layout

projects.json for your dynamic project list

style.scss for custom styles

Compile the SASS:

sass sass/style.scss css/style.css

4. Open index.html in your browser to view the site.

# 🔍 Search Functionality
JavaScript is used to filter projects by title and keywords dynamically. Projects are loaded from the JSON file and inserted into the DOM, making the site lightweight and scalable.

# ☁️ AWS S3 Upload
To use the /upload/ folder for AWS S3:

Configure S3 permissions via AWS Console

Use AWS SDK or signed URLs to securely handle uploads

You can integrate upload logic in script.js using AWS SDK for JavaScript in the browser

# 🔤 Fonts
Recommended business-professional fonts included in CSS:

font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;

# 📄 License
This project is open-source and free to use for personal portfolio purposes. Feel free to modify and customize it to fit your professional needs.

# 🙌 Acknowledgements
##  Crafted with ❤️ by Jacob Haseman.
