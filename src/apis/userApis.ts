import AXIOS from "../configs/axiosConfig";

// type RESPONSE_TYPE = {
//   user: {
//     name: string;
//     email: string;
//     avatar: null | string;
//     id: string;
//   };
// };

export const getUserData = async () => {
  const res: any = await AXIOS.get("/user/get-user");
  if (res.data.error) {
    return Promise.reject(res.data.error);
  }
  return res.data;
};
