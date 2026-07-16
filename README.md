# Utkrusht Assessment Catalog – Full-Stack Wiring Task

## Task Overview

This repository contains a basic full-stack application for an **Assessment Catalog** at Utkrusht, a proof-of-skills marketplace. The React frontend currently renders a hardcoded list of assessments and uses placeholder logic, while the Node.js/Express backend returns mock JSON data instead of querying MongoDB.

Your goal is to **connect the pieces end-to-end**:
- Replace mock data in the Express controllers with real MongoDB queries using Mongoose.
- Wire the existing React component to call the live API instead of using hardcoded arrays.
- Ensure data flows correctly from **MongoDB → Express API → React UI**.

---

## Helpful Tips

- **Consider** how the existing Mongoose model maps to the seeded `assessments` collection and which fields you can safely read/write.
- **Consider** how Mongoose's `find()`, `findById()`, and `save()` methods can replace the hardcoded arrays in the controller stub.
- **Think about** what fields need to be present in the request body when creating a new assessment from the React form.
- **Think about** how `res.status(...).json(...)` can be used to return consistent API responses for both success and error cases.
- **Explore** the `backend/src/controllers/controller.js` file to see which controller functions are currently returning mock data.
- **Explore** `backend/src/routes/api.js` to understand which URL paths map to which controller functions.
- **Review** the `backend/src/models/ModelName.js` file to see the schema definition for assessments.
- **Consider** using React's `useEffect` hook to trigger API calls when the main assessment component first mounts.
- **Think about** how to track `loading` and `error` state in the React component using `useState` and render appropriate messages.
- **Explore** `frontend/src/services/api.js` so you can replace the mock helper functions with real Axios calls to the backend.
- **Review** how the component currently uses the API helpers so you can adapt it without rewriting the whole UI.

---

## Objectives

- Replace mock or hardcoded data in the Express controllers with real Mongoose queries (for listing and creating assessments).
- Wire the existing React component to the live backend API so the UI displays and updates real data from MongoDB.
- Implement basic error handling and loading states in the React frontend when calling the API.
- Add a single-field MongoDB index on the most commonly queried field for assessments (for example, the `title` field).
- Ensure the full data flow works correctly from **MongoDB → Express API → React UI**, including creating new assessments.

---

## How to Verify

- Open the React UI in your browser and confirm that the assessment list displays real data coming from MongoDB (not the original hardcoded mock data).
- Use a MongoDB client such as MongoDB Compass or `mongosh` to inspect the `utkrusht_assessments` database and confirm that assessments exist in the `assessments` collection.
- Submit the "Add New Assessment" form in the React UI and verify that a new document appears in the `assessments` collection and in the rendered list.
- Use Postman or `curl` to call the backend API endpoints (for example, `GET /api/assessments` and `POST /api/assessments`) and verify they return/accept real JSON data.
- Confirm that the frontend shows a loading message while data is being fetched and a readable error message if an API call fails.
- Check the `assessments` collection's indexes in MongoDB Compass to verify that a single-field index exists on the primary query field (such as `title`).
