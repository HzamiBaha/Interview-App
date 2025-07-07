
# 🧪 Angular + JSON Server Task Manager App (Interview Test)

This repository contains a **working backend** and a **scaffolded Angular 17 frontend** to assess Angular development skills in a realistic scenario.

---

## 🔧 Backend (Node.js + JSON Server Auth)

### ✅ Features
- User registration and login via `/register` and `/login`
- Task CRUD endpoints protected by JWT (`/tasks`)
- Authenticated access only using `json-server-auth`
- Public documentation available at root (`http://localhost:3000`)

### 🚀 Getting Started

```bash
cd backend
npm install
npm start
```

Backend will run at `http://localhost:3000`.

### 👤 Test User

```json
{
  "email": "newuser@example.com",
  "password": "123456"
}
```

---

## 🅰️ Angular Frontend (Angular 18)

### 📁 Folder Structure

```txt
src/app/
│
├── auth/
│   ├── login/               # LoginComponent
│   ├── register/            # (Optional) Registration component
│   ├── auth.guard.ts        # Route protection
│   ├── auth.interceptor.ts  # JWT interceptor
│   └── auth.service.ts      # Login, logout, JWT storage
│
├── tasks/
│   ├── task-form/           # Reactive form for add/edit
│   ├── task-list/           # Task list view
│   ├── task-management/     # (Optional wrapper/container)
│   └── task.service.ts      # Task API + RxJS state management
│
├── app.component.ts / .html # Root component
├── app.routes.ts            # Angular route definitions
└── app.config.ts            # App-wide providers
```

### 🔨 Setup Instructions

```bash
cd frontend
npm install
ng serve
```

Runs on `http://localhost:4200`.

---

## 🎯 Candidate Tasks

1. **Login Form (Template-driven)**:
   - Use `[(ngModel)]` to bind login credentials.
   - Call AuthService to authenticate.
   - Store JWT in `localStorage`.

2. **Protect Routes**:
   - Implement `AuthGuard` to block access to `/tasks` when not authenticated.

3. **HTTP Interceptor**:
   - Create an interceptor to attach the token to all API calls.

4. **Display Task List**:
   - Fetch tasks from `/tasks` using `TaskService`.
   - Use `BehaviorSubject` to manage state.
   - Display in `TaskListComponent` using `*ngFor`.

5. **Add/Edit Tasks (Reactive Form)**:
   - Implement task creation and optionally editing.
   - Use Angular Reactive Forms with validation.

6. **Logout Functionality**:
   - Clear the token and redirect to login page.

7. *(Optional)*: Task delete, update, and UI improvements using Angular Material.

---

## 💡 Tips

- Use Postman to test the backend (`/login`, `/tasks`, etc.).
- Ensure you’re attaching the token as:
  ```http
  Authorization: Bearer <JWT_TOKEN>
  ```
- Tasks should be user-specific (the backend enforces this).

---

## 🧠 Evaluation Areas

| Area              | Expected Skill |
|-------------------|----------------|
| Forms             | Template + Reactive |
| Routing           | Route protection, navigation |
| Auth              | Login flow, JWT storage |
| HTTP              | API calls + interceptor |
| State management  | Service + RxJS |
| Code organization | Modular, readable, Angular best practices |

---

> ✅ Everything is set up. Start with login, explore the backend API, and build out the rest of the app.

Good luck! 🚀
