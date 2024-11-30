# Advance Java Project Setup



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

4. **Java Development Kit (JDK)**
   - Download and install the JDK: [JDK Downloads](https://www.oracle.com/in/java/technologies/downloads/)
   - Follow this video tutorial to install and configure JDK: [JDK Installation Guide](https://youtu.be/R6MoDMASwag?si=yqememQe_6sT8dJK)

---

## Steps to Setup the Project

### 1. Install Prerequisites
   - Make sure the JDK, Eclipse IDE, Apache Tomcat, and Oracle Database are installed and configured properly before proceeding.

### 2. Create a New Dynamic Web Development Project
   - Open Eclipse IDE.
   - Go to `File` → `New` → `Dynamic Web Project`.
   - Name the project and complete the wizard.

### 3. Initialize Git in the Project Folder
   - Open the terminal inside the project folder. You can use the integrated terminal in Eclipse or any command-line tool.
   - Run the following commands:
     ```bash
     git init
     ```

### 4. Connect to the Remote Repository
   - Add the remote repository:
     ```bash
     git remote add origin https://github.com/labanidas/ADVANCE-JAVA-PROJECT.git
     ```
   - Create and switch to a new branch with your name:
     ```bash
     git checkout -b <your-name>
     ```
     Replace `<your-name>` with your actual name.

### 5. Pull the Latest Changes
   - Fetch the latest code from the master branch:
     ```bash
     git pull origin master
     ```

---
