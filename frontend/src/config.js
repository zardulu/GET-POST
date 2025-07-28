
const config = {
  development: {
    apiUrl: process.env.NEXT_PUBLIC_DEV_API_URL || 'http://localhost:5001/api',
  },
  production: {
    apiUrl: process.env.NEXT_PUBLIC_PROD_API_URL || 'https://your-backend-app.vercel.app/api',
  },
};

export default config;
  