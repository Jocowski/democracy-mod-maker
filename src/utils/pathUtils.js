// Utility function to get the correct base path for GitHub Pages
export const getBasePath = () => {
  // Check if we're running on GitHub Pages
  if (window.location.hostname === 'jocowski.github.io') {
    return '/democracy-mod-maker';
  }
  // For local development
  return '';
};

// Helper function to build data file URLs
export const getDataUrl = (path) => {
  const basePath = getBasePath();
  return `${basePath}${path}`;
};
