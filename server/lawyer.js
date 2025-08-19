import api from "./Api";


export const getSingleLawyer = async (id) =>{
    try {      
        const {data} = await api.get(`/lawyers/${id}`)
        return data.data;
    } catch (error) {
        console.log(error)
    }
}

export const uploadLawyerImage = async (formData, token) => {
  try {
    const { data } = await api.post("/lawyers/upload-image", formData, {
      headers: {
        Authorization:token
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};