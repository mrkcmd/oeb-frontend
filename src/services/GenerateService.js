import API from "@/services/API";

class GenerateService {
  generateUrl(username) {
    return API().post("", username);
  }
}
export default new GenerateService();
