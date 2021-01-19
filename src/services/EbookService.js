import API from "@/services/API";

class EbookService {
  getEbook(data) {
    return API().post("/api/AccountFindEbook", data);
  }
}

export default new EbookService();
