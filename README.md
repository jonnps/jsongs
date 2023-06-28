# JSongs

This project was built using the skills and knowledge gained from an in-depth Vue.js course. The course covered a wide range of topics including Vue fundamentals, advanced components, state management with Pinia, form validation, authentication, routing, file uploading, internationalization, Progressive Web Apps, optimizations, deployment, and testing. The focus of the course was on understanding core concepts, rather than just coding along. This project is a practical application of the principles and techniques learned throughout the course.

Deployment Link [here](https://jonnps-jsongs.netlify.app/)

## Tools Used

- **Vite**: The app is compiled and bundled using Vite, which provides a fast and efficient development experience.
- **Vue Test Utils**: Unit tests for the application are implemented using the Vue Test Utils framework.
- **Cypress**: Cypress is utilized as the end-to-end (e2e) testing environment for comprehensive testing of the application.
- **Howler**: Howler, a powerful audio library, handles all media playing requirements within the app.
- **Firebase** and **Firestore**: The backend solution for this app is built on Firebase, with Firestore serving as the database technology of choice.
- **Pinia**: For global state management, Pinia is used due to its simplicity and ease of maintenance.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
