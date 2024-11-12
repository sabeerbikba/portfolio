const environment = {
   nodeEnv: process.env.NODE_ENV || 'development',
   baseUrl: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/` : 'https://sabeerbikba.vercel.app/',
   repoOwner: process.env.VERCEL_GIT_REPO_OWNER || 'sabeerbikba',
};

export default environment;
