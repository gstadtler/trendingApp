import axios from "axios";

export const fetchTrendingTopics = async () => {
  const { data } = await axios.get("https://backendstrateegia.herokuapp.com");
  return data;
};
