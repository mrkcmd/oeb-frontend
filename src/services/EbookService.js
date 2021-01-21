import API from "@/services/API";

class EbookService {
  getEbook(data) {
    return API().post("/api/AccountFindEbook", data);
  }
  download(data) {
    return API().get("/api/files", data);
  }
}

export default new EbookService();
