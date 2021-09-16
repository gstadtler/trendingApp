import axios from "axios";

export const fetchTrendingTopics = async () => {
  const { data } = await axios.get("http://localhost:5000");
  return data;
};
