import axios from "axios";
import LocalStorage from "./localstorage";

export const refreshToken = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const ACCES_TOKEN = LocalStorage.getItem("accessToken");

  try {
    const res = await axios.get(`${BASE_URL}/api/members/rotate`, {
      headers: {
        Authorization: `Bearer ${ACCES_TOKEN}`,
      },
    });

    if (res.status === 200) {
      console.log("token 만료");
      const data = res.data.result;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }
  } catch (err) {
    console.log(err);
  }
};

