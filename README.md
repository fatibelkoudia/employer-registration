# Employer Registration Form

A small React app that allows users to register via a validated form. Includes real-time error feedback, persistent local storage, and a dynamic list of registered users.

> Published on [npm](https://www.npmjs.com/package/fatibelkoudia-employer-registration)  
> Live Demo: [GitHub Pages](https://fatibelkoudia.github.io/employer-registration)  
> Documentation: [View JSDoc](https://fatibelkoudia.github.io/employer-registration/docs)

---

## Features

- Real-time form validation
- Submit button disabled until all fields are valid
- Inline error messages displayed in red
- Toast notifications for success & errors
- Data saved to localStorage
- 97.5%+ test coverage (unit + integration)
- JSDoc documentation auto-generated
- CI/CD with GitHub Actions (test & deploy)

---

## Form Fields & Validation Rules

| Field           | Rule                                              |
| --------------- | ------------------------------------------------- |
| **First Name**  | Required, only letters (accents, hyphens allowed) |
| **Last Name**   | Same as above                                     |
| **Email**       | Must be a valid email address                     |
| **Birth Date**  | Must be at least 18 years old                     |
| **City**        | Letters only                                      |
| **Postal Code** | Valid French postal code (exactly 5 digits)       |

---

## Available Scripts

Inside the `employer-registration` directory:

| Script                 | Description                                   |
| ---------------------- | --------------------------------------------- |
| `npm start`            | Runs the app in development mode              |
| `npm test`             | Launches the test runner (unit & integration) |
| `npm run build`        | Builds the app for production                 |
| `npm run jsdoc`        | Generates component documentation (JSDoc)     |
| `npm run deploy`       | Deploys the app to GitHub Pages               |
| `npm run build-npm-ci` | Builds the library version for npm publishing |

---

## Tests

Tests include:

- Age calculation & validation
- Name, email, and postal code format validation
- Button disabling logic
- Error messages and toast appearance
- LocalStorage saving + form reset on success
- Display of registered users

Coverage report: 97%+  
See `/coverage` folder or check [Codecov](https://app.codecov.io/) if integrated.

---

## Deployment & CI/CD

GitHub Actions automates:

- Linting & testing on every push
- Code coverage upload (Codecov)
- Deployment to GitHub Pages
- Publishing to npm (on new version)

---
