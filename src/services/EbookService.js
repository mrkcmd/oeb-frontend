import API from "@/services/API";

class EbookService {
  getEbook(data) {
    return API().post("api/AccountFindEbook", data);
  }

  getUrlDownload(data) {
    return API().post("api/files", data);
  }
  deleteFile(data) {
    return API().post("api/deletefile", data);
  }
  getLogDownload(data) {
    return API().post("api/logDownload", data);
  }
}

export default new EbookService();
