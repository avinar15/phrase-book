import axios from "axios";
import { serverURL } from "../environment";
import getCommonHeaders from "../services/header";

export default class WordService {
  info(id) {
    return axios.get(`${serverURL}/api/words/${id}`, {
      headers: getCommonHeaders(),
    });
  }

  delete(id) {
    return axios.delete(`${serverURL}/api/words/${id}`, {
      headers: getCommonHeaders(),
    });
  }

  index(page) {
    return axios.get(`${serverURL}/api/words?per_page=2&page=${page}`, {
      headers: getCommonHeaders(),
    });
  }

  create(wordObj) {
    return axios.post(`${serverURL}/api/words`, wordObj, {
      headers: getCommonHeaders(),
    });
  }
  update(id, wordObj) {
    return axios.post(`${serverURL}/api/words/${id}`, wordObj, {
      headers: getCommonHeaders(),
    });
  }
}
