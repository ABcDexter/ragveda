// API Configuration
// Empty by default for same-origin Docker/production deployments.
// Set VITE_API_URL when the API is hosted on another origin.
const API_BASE_URL = import.meta.env.VITE_API_URL || "";
//const API_BASE_URL = 'http://localhost:8000';

export default API_BASE_URL;
