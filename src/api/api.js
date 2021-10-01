import axios from "axios";

const DEV = false;

const AxiosInstance = () => {
  const instance = axios.create({
    baseURL: DEV ? "http://localhost:3333/api/v1" : "https://api-teobot-steam-review.herokuapp.com/api/v1",
  });

  return instance;
};

export default AxiosInstance();
