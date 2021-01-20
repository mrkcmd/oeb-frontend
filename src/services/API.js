import axios from "axios";

export default () => {
  return axios.create({
    baseURL: "https://pdx-ebook.herokuapp.com/"
  });
};
