import axios from "axios";

export default () => {
  return axios.create({
    baseURL: "https://ebook-taksaonline-backend.herokuapp.com/"
  });
};
