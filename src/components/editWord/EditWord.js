import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import WordService from "../../services/word-service";
import Loading from "../loading/loading";
import { useSpeechSynthesis } from "react-speech-kit";

const EditWord = () => {
  const { speak } = useSpeechSynthesis();
  const { id } = useParams();
  const [word, setWord] = useState({});
  const [loading, setLoading] = useState(false);
  const ws = new WordService();

  const nav = useNavigate();

  const getWordInfo = async () => {
    setLoading(true);
    const res = await ws.info(id);
    if (res && res.data) {
      setWord(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getWordInfo();
  }, []);

  const addWord = (e) => {
    setLoading(false);
    ws.update(id, {
      word: word,
      language_alpha2code: "en",
    })
      .then((res) => {
        toastr.success(res.data.message);
        nav("/words");
      })
      .catch((err) => {
        toastr.error(err?.response?.data?.message);
        nav("/words");
      });
    setLoading(true);
  };
  return (
    <div className="container mt-5 bg-light flex-column col-lg-7 justify-content-center d-flex border align-content-center">
      <Loading loading={loading} />
      <p className="mt-4 fst-italic fw-lighter">
        Is the word you are looking for wrong? Enter the correct one!!
      </p>
      <div className="d-flex justify-content-around align-items-center">
        <input
          placeholder="Add Words"
          className="mt-1 rounded-2 p-2 w-75"
          value={word.word}
          onChange={(e) => setWord(e.target.value)}
        />
        <span
          className="btn btn-link bi bi-megaphone"
          onClick={() => speak({ text: word.word })}
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

export default EditWord;
