import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/loading";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import WordService from "../../services/word-service";
import { useSpeechSynthesis } from "react-speech-kit";

const AddWords = () => {
  const { speak } = useSpeechSynthesis();
  const [word, setword] = useState("");
  const [loading, setLoading] = useState(false);
  const ws = new WordService();

  const nav = useNavigate();

  const addWord = (e) => {
    setLoading(false);
    ws.create({
      word: word,
      language_alpha2code: "en",
    })
      .then((res) => {
        toastr.success(res.data.message);
        nav("/words");
      })
      .catch((err) => {
        toastr.error(err?.response?.data?.message);
      });
    setLoading(true);
  };

  return (
    <div className="container mt-5 bg-light flex-column col-lg-7 justify-content-center d-flex border align-content-center">
      <Loading loading={loading} />
      <p className="mt-4 fst-italic fw-lighter">Enter the desired word : </p>
      <div className="d-flex justify-content-around align-items-center">
        <input
          placeholder="Add Words"
          className="mt-1 rounded-2 p-2 w-75"
          value={word}
          onChange={(e) => setword(e.target.value)}
        />
        <span
          className="btn btn-link bi bi-megaphone"
          onClick={() => speak({ text: word })}
        ></span>
      </div>
      <div className="my-4 justify-content-center d-flex flex-column">
        <p className="fst-italic fw-lighter justify-content-center d-flex">
          You can save by clicking on the button
        </p>
        <div className="justify-content-center d-flex">
          <button className="btn btn-success" onClick={addWord}>
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWords;
