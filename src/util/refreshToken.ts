export const refreshToken = async (token: string, url: string) => {
  try {
    const res = await axios.get(`${url}/api/members/rotate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      console.log("token REFRESH");
      const data = res.data.result;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }
  } catch (err) {
    console.log(err);
  }
};
