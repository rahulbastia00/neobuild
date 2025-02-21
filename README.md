You can structure the API documentation into **three sections** for better clarity:

### 1. **Overview of API Endpoints**
A simple list of endpoints with their purpose.

| **Endpoint**              | **Method** | **Description**                          | **Authentication** |
|---------------------------|------------|------------------------------------------|--------------------|
| `/api/auth/login`         | `POST`     | User login with hardcoded credentials    | ❌                 |
| `/api/resume/enrich`      | `POST`     | Upload and analyze a resume PDF          | ✅ (JWT Token)     |
| `/api/search/name`        | `POST`     | Search for resumes by applicant's name  | ✅ (JWT Token)     |

---

### 2. **Detailed API Descriptions**

#### 🔐 **1. User Login**
- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "username": "naval.ravikant",
    "password": "05111974"
  }
  ```
- **Response:**
  ```json
  {
    "JWT": "your-jwt-token"
  }
  ```
- **Errors:**
  - `401 Unauthorized`: Invalid credentials provided.

---

#### 📄 **2. Enrich Resume (PDF Analysis)**
- **Endpoint:** `POST /api/resume/enrich`
- **Headers:**
  - `Authorization: Bearer <JWT>`
- **Request Body:**
  ```json
  {
    "url": "https://example.com/resume.pdf"
  }
  ```
- **Response:**
  ```json
  {
    "name": "[ENCRYPTED]",
    "email": "[ENCRYPTED]",
    "skills": ["JavaScript", "Node.js", "MongoDB"]
  }
  ```
- **Errors:**
  - `400 Bad Request`: If the PDF URL is missing.
  - `500 Internal Server Error`: If text extraction or encryption fails.

---

#### 🔍 **3. Search Resume by Name**
- **Endpoint:** `POST /api/search/name`
- **Headers:**
  - `Authorization: Bearer <JWT>`
- **Request Body:**
  ```json
  {
    "name": "Rahul"
  }
  ```
- **Response:**
  ```json
  [
    {
      "name": "Rahul Bastia",
      "email": "rahul@example.com",
      "skills": ["React", "Node.js", "MongoDB"]
    }
  ]
  ```
- **Errors:**
  - `404 Not Found`: No matching resumes found.
  - `500 Internal Server Error`: Database or decryption failure.

---

### 3. **How to Test the APIs**

**Pre-requisites:**
- Install [Postman](https://www.postman.com/downloads/) or use cURL.

**Step-by-Step:**
1. 🔑 **Login to get the JWT Token**  
   Send a POST request to `/api/auth/login` with valid credentials.  
   Copy the returned token.

2. 🛡️ **Authorize the API calls**  
   Add the following header to all protected routes:
   ```
   Authorization: Bearer <Your-JWT-Token>
   ```

3. 📤 **Upload and Analyze a Resume**  
   Use the `/api/resume/enrich` endpoint by sending a valid PDF URL.

4. 🔍 **Search for Resumes by Name**  
   Send a POST request to `/api/search/name` with the name of the applicant.

Would you like me to format this for a README file or documentation site?
