# CS50W Capstone Project: Money Tracker

This project is a money tracker, can be used to track daily expenses and debts. This project uses Next.js 13 (a React framework for production) as the frontend and Django with Django REST Framework as the backend. I've chosen to use Django with DRF so that I can contact the backend more easily with React via AJAX. I've also decided to separate the backend and the frontend so that I can have a separation of concerns.

This application contains the following features:

1. **Authentication**

Users are allowed to create their own account and have their information separate from another user that might use the application.

2. **Multiple tracking accounts for each user**

For each user, they can create multiple accounts (in banking terms) that each track records separately. This can help the user to replicate their money separation in real life. For example, if user A stores his money in a bank and he also keeps some cash on himself, he can create two tracking accounts in the application so that each corresponds to their real life counterparts.

3. **Record tracking**

In each tracking account mentioned in the previous point, the user can track their daily expense and incomes each as a record. Each record will contain a description, date and time, and amount of money (negative for expenses and positive for incomes) that describes the record.

4. **Debt tracking**

In addition to record tracking, this application also allows for debt tracking. Debts are also stored similarly like a record. The difference lies in the ability to associate a group of records with a name (the name of the person the user lent/borrowed money from). Each person will have a section of its own with the total debt displayed in the top of its section.

Some other minor features worth mentioning is changing username and animations (for better UX).

## Files and Directories in This Project

At the root of the project, there are two directories, namely frontend and backend. Each are responsible for what they are called

### frontend

This directory contains all of the source code responsible for the frontend of the project. The following section will briefly explain each file and directory in the frontend directory.

- node_modules/ (contains all packages (dependencies) needed to run this frontend app)
- public/ (contains files that are public to the user such as images and SVGs)
- utils/ (contains helper functions)
- app/ (the source code for the application itself, will be explained in more detail later)
- components/ (reusable piece of UI components for use in the app/ directory)
- context/ (contains the global state manager for the application)
- hooks/ (contains custom hooks)
- tailwind.config.js (the config file for tailwindcss, used for customization)

#### The app/ directory

This directory contains the source code for the application. The structure of the directory defines the routes in the application. For example, if the user navigates to http://localhost::3000/dashboard, the /frontend/app/dashboard/page.js file will be shown to the user.

The files in this directory uses JSX to define how a page look.

Files and directories other than the mentioned in the above is a boilerplate generated automatically by the command-line tool that Next.js provides to quickly setup a new project.

### backend

This directory contains all of the source code responsible for the backend of the project. The following section will briefly explain each file and directory in the backend directory.

- api/ (an application that contains all the models ,views and urls config of the backend)
- backend/ (contains the config files and urls for the backend)
- db.sqlite3 (the database)
- serializers.py (a file that contain a class that serializes a python dictionary to JSON format so that data transfer can be done)

Files and directories not mentioned in the above are self-explanatory or already explained in previous lectures and projects.

## Distinctiveness and Complexity

This project is distinct from other projects in the course in that this application is a dashboard application. This application stores data and present the data to the user with a pleasing and easy to navigate UI. Some notable differences of this application and other projects in this course are:

1. User Interface and Design

This application is created with layouts and colors that are pleasing to the eye with tailwindcss. That is not the case for previous projects since in previous projects UI and design are not specified in the requirements and are expected to be done with Bootstrap, which is not as flexible as tailwindcss. This application also has animations that further improves the UX. Previous project doesn't require animations, which makes this application distinct in this domain.

2. Application Architecture

This application adopts a microservice architecture while previous projects adopt a monolithic architecture, where the frontend and backend are tightly coupled together while this appliction's frontend and backend are more loosely coupled.

3. JavaScript Usage

This application requires a lot of interactivity, which is not possible without complex JavaScript usage. In previous projects, the only project that make use of JavaScript is the fourth project and that project still uses vanilla JavaScript, which may prove to be hard to make highly interactive application such as this money tracker. The usage of React allows for easier state management, making the task of creating a dashboard more doable. Next.js also provides a lot of optimizations out of the box, making the application more optimized than a plain Django project.

4. Backend

The backend of this project also proves to be more complex than previous projects since there are way more urls and the views also make use of the built-in permissions feature of DRF to increase data security.

## Setup Guide

### Backend setup guide

1. Create a virtual environment

```
cd backend
python -m venv .venv

.venv/scripts/activate (in Windows)
.venv/bin/activate (in macOS or Linux)
```

2. Install packages

```
pip install -r requirements.txt
```

3. Apply migrations and run a local server

```
python manage.py migrate
python manage.py migrate api
python manage.py runserver
```

### Frontend setup guide

1. Install dependencies (node.js required)

```
cd frontend
npm install
```

2. Run a local server

```
npm run dev
```
