export default {
  API_ENDPOINT:
    process.env.REACT_APP_API_ENDPOINT ||
    /* "http://localhost:8000/api" */  "https://blooming-island-14092.herokuapp.com/api",
  TOKEN_KEY: process.env.REACT_APP_TOKEN_KEY || "laurie-blog-client-auth-token"
};