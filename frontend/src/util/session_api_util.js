import axios from "axios";

export const login = user => axios.post("/api/users/login", user);
