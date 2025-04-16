// API configuration for development and production environments

// Create a function to build API URLs
export const buildApiUrl = (path: string): string => {
  // For Render deployment, use relative URLs which automatically
  // target the current domain (where both client and server are hosted)
  return path;
};