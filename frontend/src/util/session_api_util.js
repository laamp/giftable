import axios from "axios";

export const sendGoogleToken = token =>
  axios.post("/api/users/oauth", { token });
