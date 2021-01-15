import API from "@/services/API";

class GenerateService {
  generateUrl() {
    return API()
      .post("/api/generateUrl")
      .then(res => {
        if (res.data.token) {
          localStorage.setItem("token", JSON.stringify(res.data));
        }
      });
  }
  deleteToken(token) {
    return API().post("/api/deleteUrl", token);
  }
}
export default new GenerateService();
