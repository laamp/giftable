import axios from "axios";

export const login = user => axios.post("/api/users/login", user);

export const logout = () => axios.delete("/api/users/logout");

export const guestLogin = () => axios.post("/api/users/guest");
