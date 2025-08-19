import axios from 'axios';

const api = axios.create({
    baseURL: 'https://legalmate-backend.onrender.com/api/v1',
    
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token ;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (config) =>{
        const token = localStorage.getItem("token");
        if(token) {
            config.headers.Authorization = token;
        }
        return config
    },
    (error) =>{
        return Promise.reject(error);
    }
);


 export const logIn = (userData) =>{
    return api.post('/auth/login',userData)
}

export const singUp = (createUser) =>{
    return api.post('/users/createAUser',createUser);
}

export const forgetPassword = (emailLink) =>{
    return api.post("/auth/forget-password",emailLink)
}

export const resetPassword = (payload, token) => {
  return api.post(`/auth/reset-password`, payload,{
    headers:{
      Authorization: token
    }
  });
};

//   const onSubmit: SubmitHandler<TForgetPasswordFormInput> = (data) => {
//     setIsLoading(true);

//     axiosSecure
//       .post(
//         "/auth/reset-password",
//         { ...data, id },
//         {
//           headers: {
//             Authorization: token as string,
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       .then(({ data }) => {
//         if (data.statusCode === 200) {
//           toast.success(data.message);
//           setTimeout(() => {
//             router.push("/login");
//             toast.success("Please login with your new password");
//           }, 5000);
//         }
//       })
//       .catch((error) => {
//         const errorMessage = error.response?.data?.message;
//         if (errorMessage === "jwt expired") {
//           router.push("/forget-password");
//           toast.error("Token expired, please request a new reset link.");
//         } else toast.error(errorMessage || "Reset failed");
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };





//  Response Interceptor (AccessToken expire হলে Refresh)
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

    
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const res = await axios.post(
//           "https://legalmate-backend.onrender.com/api/v1/auth/refresh-token",
//           {},
//           { withCredentials: true }
//         );
//         const newAccessToken = res.data?.data?.accessToken;

//         if (newAccessToken) {
//           localStorage.setItem("accessToken", newAccessToken);
//           originalRequest.headers.Authorization = newAccessToken;
//           return api(originalRequest); 
//         }
//       } catch (err) {
//         console.error("Refresh token failed", err);
//         localStorage.removeItem("accessToken");
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default api;