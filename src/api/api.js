import axios from "axios";

const AxiosInstance = () => {
  const instance = axios.create({
    baseURL: "http://localhost:3333/api/v1",
  });

  return instance;
};

export default AxiosInstance();
