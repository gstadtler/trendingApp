import axios from "axios";

export default axios.create({
  baseURL: "https://api.strateegia.digital",
  headers: {
    "Content-Type": "application/json",
  },
});
