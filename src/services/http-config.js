import axios from "axios";

/**
 * Create an axios instance with a custom config
 */
export default axios.create({
  baseURL: import.meta.env.VITE_BACKED_ENDPOINT ?? "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});
