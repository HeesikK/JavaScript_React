import axios from "axios";

export const getTodoData = async () => {
  const res = await axios.get("api/products");
  return res.data;
};

export const getMovieData = async () => {
  const res = await axios.get("api/movies");
  return res.data;
};
