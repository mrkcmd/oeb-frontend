import API from "@/services/API";

class PermissionService {
  getAccounts() {
    return API().get("api/ebook/findaccount");
  }
  getEbooks() {
    return API().get("api/ebookfindall");
  }

  addEbook(data) {
    return API().post("api/ebook/add", data);
  }
}
export default new PermissionService();
