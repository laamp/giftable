import axios from "axios";

export const sendAuthToken = token => axios.post("/api/users/oauth", token);

// for test
export const foo = () => axios.get("/test");
