import dotenv from "dotenv";
dotenv.config();

//Used for development/testing
const env = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
};

// For react app import
// const env = {
//     SUPABASE_URL: import.meta.env.SUPABASE_URL,
//     SUPABASE_ANON_KEY: import.meta.env.SUPABASE_ANON_KEY,
// };



export default env;