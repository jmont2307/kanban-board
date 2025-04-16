// API configuration for development and production environments

// Get the base API URL based on environment
const getApiBaseUrl = (): string => {
  // Use the environment variable if provided (in production)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // In development, use the local server
  return 'http://localhost:3001';
};

// Export the API base URL
export const API_BASE_URL = getApiBaseUrl();

// Create a function to build API URLs
export const buildApiUrl = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Combine base URL and path
  return `${API_BASE_URL}/${cleanPath}`;
};