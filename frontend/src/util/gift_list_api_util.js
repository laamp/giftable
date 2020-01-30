import axios from "axios";

export const getGiftLists = id => axios.get(`/api/gift_lists/user/${id}`);

export const createGiftList = (title, id) =>
  axios.post("/api/gift_lists", { title: title, creatorId: id });
