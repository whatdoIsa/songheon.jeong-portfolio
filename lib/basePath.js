export const basePath = process.env.NODE_ENV === 'production' ? '/iOS-Portfolio' : '';
export const withBase = (path) => `${basePath}${path}`;
