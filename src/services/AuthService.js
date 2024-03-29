import API from "@/services/API";

class UserService {
  signup(data) {
    return API().post("api/auth/signup", data);
  }
  signupAdmin(data) {
    return API().post("api/auth/signupAdmin", data);
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
  signout(user) {
    return API()
      .post("api/auth/logout", user)
      .then(() => {
        localStorage.removeItem("user");
      });
  }
  autologout(user) {
    return API()
      .post("api/auth/autologout", user)
      .then(() => {
        localStorage.removeItem("user");
      });
  }
}
export default new UserService();
