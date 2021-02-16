import API from "@/services/API";
const FileSaver = require("file-saver");

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

  download(data) {
    return API()
      .get("/api/files/" + data, {
        responseType: "arraybuffer",
        headers: { Accept: "application/pdf" }
      })
      .then(response => {
        const blob = new Blob([response.data], {
          type: "application/pdf"
        });
        FileSaver.saveAs(blob, data + ".pdf");
      });
  }
}

export default new EbookService();
