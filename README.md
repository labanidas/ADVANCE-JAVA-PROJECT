# Advance Java Project Setup

This README file provides step-by-step instructions for setting up the Advance Java Project along with the necessary prerequisites.

---

## Prerequisites

1. **Eclipse IDE**
   - Download Eclipse IDE for Enterprise Java and Web Development: [Eclipse Downloads](https://www.eclipse.org/downloads/)
   - Ensure to select "Eclipse IDE for Enterprise Java and Web Development" during the installation process.

2. **Apache Tomcat**
   - Follow this tutorial to install and configure Apache Tomcat: [Tomcat Setup Tutorial](https://youtu.be/d8BAQ_zRmYY?si=SNu4g4zv7dIDDWk4)
   - Alternatively, download Apache Tomcat from the official website: [Apache Tomcat 9 Downloads](https://tomcat.apache.org/download-90.cgi)

3. **Oracle Database**
   - Download Oracle XE: [Oracle XE Downloads](https://www.oracle.com/in/database/technologies/xe-downloads.html)
   - Watch the installation tutorial for Oracle XE: [Oracle XE Installation Guide](https://youtu.be/uoxd5oloEQY?si=nvfIXU2nS8j_KBoW)

---

## Steps to Setup the Project

### 1. Create a New Dynamic Web Development Project
   - Open Eclipse IDE.
   - Go to `File` → `New` → `Dynamic Web Project`.
   - Name the project and complete the wizard.

### 2. Initialize Git in the Project Folder
   - Open the terminal inside the project folder. You can use the integrated terminal in Eclipse or any command-line tool.
   - Run the following commands:
     ```bash
     git init
     ```

### 3. Connect to the Remote Repository
   - Add the remote repository:
     ```bash
     git remote add origin https://github.com/labanidas/ADVANCE-JAVA-PROJECT.git
     ```
   - Create and switch to a new branch with your name:
     ```bash
     git checkout -b <your-name>
     ```
     Replace `<your-name>` with your actual name.

### 4. Pull the Latest Changes
   - Fetch the latest code from the master branch:
     ```bash
     git pull origin master
     ```

---

## Additional Notes
- Ensure that Tomcat is properly configured in Eclipse for the project to run smoothly.
- Verify Oracle XE is up and running before testing database connections.
- Use the `README` as a quick reference for setting up additional environments or troubleshooting issues.

---
