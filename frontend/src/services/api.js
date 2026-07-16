import axios from 'axios';

// Axios instance configured to talk to the backend API.
// In Docker on your local machine, this will resolve to localhost:5000.
// When deployed remotely, replace localhost with the droplet IP if needed.
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Currently returns mock data instead of calling the real API.
// Your task is to replace the mock implementation with real
// HTTP calls using apiClient.

export async function getAssessments() {
  // TODO: Replace mock return value with:
  // const response = await apiClient.get('/assessments');
  // return response.data;
  return [
    {
      id: 'mock-frontend-1',
      title: 'Frontend Mock Assessment',
      category: 'Frontend',
      difficulty: 'Beginner',
      durationMinutes: 20
    },
    {
      id: 'mock-backend-1',
      title: 'Backend Mock Assessment',
      category: 'Backend',
      difficulty: 'Intermediate',
      durationMinutes: 40
    }
  ];
}

export async function createAssessment(assessment) {
  // TODO: Replace mock implementation with:
  // const response = await apiClient.post('/assessments', assessment);
  // return response.data;
  return {
    id: `mock-created-${Date.now()}`,
    ...assessment
  };
}

export default apiClient;
