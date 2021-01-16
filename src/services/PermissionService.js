import API from "@/services/API";

class PermissionService {
  getAccounts() {
    return API().get("/api/ebook");
  }
}
export default new PermissionService();
