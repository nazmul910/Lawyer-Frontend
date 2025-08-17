import axios from "axios";

const api = axios.create({
baseURL: 'https://legalmate-backend.onrender.com/api/v1',
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (config) =>{
        const token = localStorage.getItem("accessToken");
        if(token) {
            config.headers.Authorization =`Bearer ${token}`;
        }
        return config
    },
    (error) =>{
        return Promise.reject(error);
    }
)
    

export const getSingleLawyer = async (id) =>{
    try {
      
        const {data} = await axios.get(`/lawyers/${id}`)
        return data;
    } catch (error) {
        console.log(error)
    }
}