import axios from "axios";

const adminApi = axios.create({
    baseURL:'https://legalmate-backend.onrender.com/api/v1',
})

adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


adminApi.interceptors.response.use(
    (config) =>{
        const token = localStorage.getItem("token");
        if(token) {
            config.headers.Authorization =`Bearer ${token}`;
        }
        return config
    },
    (error) =>{
        return Promise.reject(error);
    }
);

export const getLaywerData = () =>{
    return adminApi.get("/lawyers");
}