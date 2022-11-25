import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../loading/loading";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const AddTranslate = () => {
  const [translation, settranslation] = useState("");
  const [definition, setdefinition] = useState("");
  const [example, setexample] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const wordID = params.wordId;

  const nav = useNavigate();

  const addTranslate = (e) => {
    const token = localStorage.getItem("token");
    setLoading(true)
    axios
      .post(
        "https://pb.m6d.ir/api/translations",
        {
          word_id: parseInt(wordID),
          language_alpha2code: "fa",
          translation: translation,
          definition: definition,
          example: example,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toastr.success(res.data.message);
        nav(`/words/${wordID}/translate`);
        setLoading(false)
      })
      .catch((err) => {
        toastr.error(err?.response?.data?.message);
        setLoading(false);
      });
  };

  return (
    <div className="container mt-5 bg-light flex-column col-lg-7 justify-content-center d-flex border align-content-center">
      <Loading loading={loading} />
      <p className="mt-4 fst-italic fw-lighter">
        Enter the desired translation :{" "}
      </p>
      <input
        placeholder="Add translation"
        className="mt-1 rounded-2 p-2"
        value={translation}
        onChange={(e) => settranslation(e.target.value)}
      />
      <input
        placeholder="Add definition"
        className="mt-1 rounded-2 p-2"
        value={definition}
        onChange={(e) => setdefinition(e.target.value)}
      />
      <input
        placeholder="Add example"
        className="mt-1 rounded-2 p-2"
        value={example}
        onChange={(e) => setexample(e.target.value)}
      />
      <div className="my-4 justify-content-center d-flex flex-column">
        <p className="fst-italic fw-lighter justify-content-center d-flex">
          You can save by clicking on the button
        </p>
        <div className="justify-content-center d-flex">
          <button className="btn btn-success" onClick={addTranslate}>
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTranslate;
