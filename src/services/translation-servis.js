import axios from "axios";
import { serverURL } from "../environment";
import getCommonHeaders from "./header";

export default class translationServis {
  get(params ,wordId) {
    return axios.get(
      `${serverURL}/api/translations${wordId}`,
      params,

      {
        headers: getCommonHeaders(),
      }
    );
  }
}
