export const basePath = process.env.NODE_ENV === 'production' ? '/songheon.jeong-portfolio' : '';
export const withBase = (path) => `${basePath}${path}`;
