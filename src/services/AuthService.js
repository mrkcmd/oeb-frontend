import API from "@/services/API";

class UserService {
  signup(data) {
    return API().post("api/auth/signup", data);
  }

  signin(data) {
    return API()
      .post("api/auth/signin", data)
      .then(res => {
        if (res.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data;
      });
  }
  signout() {
    localStorage.removeItem("user");
  }
}
export default new UserService();
