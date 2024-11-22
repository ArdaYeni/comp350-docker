# COMP 350: Introduction to DevOps  
## Project 1: Containerized Web Application

**Due Date:** May 10, 2024  
**Instructor:** Hakan Ayral, Spring 2024  
**TA Contact:** Javid Baydamirli - [jbaydamirli21@ku.edu.tr](mailto:jbaydamirli21@ku.edu.tr)  

---

## Overview

This project focuses on creating a **containerized web application** orchestrated through **Docker Compose**. The application consists of four containers and demonstrates fundamental DevOps principles such as container orchestration, networking, and persistence.

---

## Project Requirements

### Application Components

1. **Frontend (Container A)**:
   - **Technology:** Nginx
   - Purpose: Serves as the entry point for the application, forwarding requests to middle-tier containers on different ports.

2. **Middle-tier (Containers B & C)**:
   - **Technology:** Either **Node.js**, **Flask**, **Django**, or **PHP** (both containers must use the same framework).
   - Container B:
     - Serves an HTML form to collect First Name and Last Name.
     - Submissions are recorded in a **PostgreSQL database**.
     - If the name already exists, displays an appropriate message.
   - Container C:
     - Displays a list of all names in the database with options to delete entries.
     - Updates the record count after deletions.

3. **Backend (Container D)**:
   - **Technology:** PostgreSQL
   - Purpose: Provides persistence for Containers B and C.

---

### Key Features

- **Networking**:
  - Containers B, C, and D communicate over a private network not exposed to the outside world.
  - Nginx (Container A) forwards requests to the middle-tier containers on different ports.

- **Data Persistence**:
  - Database records persist even when containers are restarted using Docker volumes.

- **Form Submission (Container B)**:
  - HTML form for First Name and Last Name.
  - Records unique name pairs to the database.
  - Displays total record count or a message for duplicate entries.

- **Record Management (Container C)**:
  - Lists all name pairs with their unique IDs.
  - Provides delete functionality, with updates on remaining records.

---

## Setup and Usage

### Prerequisites

- **Docker** and **Docker Compose** installed.
- Access to the assigned **GitHub Classroom repository**.

### Steps to Run

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>


by running this command "docker compose up --build"

app running on "http://localhost:8000/post" 

Gülnisa YILDIRIM & Arda YENİ
