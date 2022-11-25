import axios from "axios";
import getCommonHeaders from "./header";

export default class translationServis {
  get(params ,wordId) {
    return axios.get(
      `http://pb.m6d.ir/api/translations${wordId}`,
      params,

      {
        headers: getCommonHeaders(),
      }
    );
  }
}
