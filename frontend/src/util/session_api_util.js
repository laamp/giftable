import axios from "axios";

export const sendGoogleToken = userInfo =>
  axios.post("/api/users/oauth", userInfo);
