const BASE_URL = process.env.BASE_URL as string;
const isVercel: boolean = process.env.VERCEL === '1'; // not used anywhere 


export {
   isVercel,
   BASE_URL,
};
