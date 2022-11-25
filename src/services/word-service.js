import axios from "axios";
import getCommonHeaders from "../services/header";

export default class WordService {
  info(id) {
    return axios.get(`https://pb.m6d.ir/api/words/${id}`, {
      headers: getCommonHeaders(),
    });
  }

  delete(id) {
    return axios.delete(`https://pb.m6d.ir/api/words/${id}`, {
      headers: getCommonHeaders(),
    });
  }

  index(page) {
    return axios.get(`http://pb.m6d.ir/api/words?per_page=2&page=${page}`, {
      headers: getCommonHeaders(),
    });
  }

  create(wordObj) {
    return axios.post("https://pb.m6d.ir/api/words", wordObj, {
      headers: getCommonHeaders(),
    });
  }
  update(id, wordObj) {
    return axios.post(`https://pb.m6d.ir/api/words/${id}`, wordObj, {
      headers: getCommonHeaders(),
    });
  }
}
