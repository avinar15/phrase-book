import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../loading/loading";
import toastr, { error } from "toastr";
import "./translate.css";
import translationServis from "../../services/translation-servis";

const Translate = () => {
  const params = useParams();
  const wordID = params.wordId;
  const token = localStorage.getItem("token");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);

  //#region modal
  const [selectedTranslation, setSelectedTranslation] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ts = new translationServis();

  function closeModal() {
    setIsModalOpen(false);
  }
  function showModal() {
    setIsModalOpen(true);
  }
  //#endregion modal
  const getTranslations = () => {
    setLoading(true);
    ts.get({
      params: {
        word_id: wordID,
        lang: "fa",
      },
    })
      .then((res) => {
        setResponse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toastr.error(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (wordID) {
      getTranslations();
    }
  }, []);

  function showTranslation(e) {
    const data = JSON.parse(e.target.dataset.value);
    setSelectedTranslation(data);
    showModal();
  }

  const handleDelete = (e) => {
    if (!window.confirm("Are you sure you wish to delete this item?")) {
      return;
    }
    setLoading(true);
    const id = e.target.dataset.value;
    const token = localStorage.getItem("token");
    axios
      .delete(`https://pb.m6d.ir/api/translations/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toastr.success(res.data.message);
        setLoading(false);
        getTranslations();
      })
      .catch((err) => {
        const error = err?.response?.data?.message;
        toastr.error(error);
        setLoading(false);
      });
  };

  let responseDom = null;
  if (response) {
    responseDom = response.map((a, index) => {
      return (
        <tr key={index}>
          <td>
            {a.id}
            <span
              className="btn btn-link bi bi-trash mx-2"
              onClick={handleDelete}
              data-value={a.id}
            ></span>
            <Link
              className="btn btn-link bi bi-pencil-square"
              to={`/words/${a.word_id}/translate/${a.id}/edit`}
            ></Link>
            <span
              onClick={showTranslation}
              data-value={JSON.stringify(a)}
              className="btn btn-link bi bi-card-text"
            ></span>
          </td>
          <td>{a.translation}</td>
          <td>{a.created_at && new Date(a.created_at).toLocaleDateString()}</td>
          <td>{a.updated_at && new Date(a.updated_at).toLocaleDateString()}</td>
        </tr>
      );
    });
  }

  return (
    <div>
      <Loading loading={loading} />
      <div className="my-2 ">
        <Link
          className="btn btn-outline-primary"
          to={`/words/${wordID}/translate/create`}
        >
          Add translate
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr className="border container">
            <th className="border-end">id</th>
            <th className="border-end">translate</th>
            <th className="border-end">created_at</th>
            <th className="border-end">updated_at</th>
          </tr>
        </thead>
        <tbody>{responseDom}</tbody>
      </table>

      <div
        className={"modalDialog " + (isModalOpen ? "show-modal" : "hide-modal")}
      >
        <div className="modalBody rounded-circle">
          <button
            title="Close"
            className="btn btn-danger rounded-circle close"
            onClick={closeModal}
          >
            X
          </button>
          <h2 className="my-2 d-flex justify-content-center">
            Translation Details
          </h2>
          <ul className="list-group list-group-flush rounded list">
            <li className="list-group-item ">
              translation:{selectedTranslation?.translation}{" "}
            </li>
            <li className="list-group-item">
              definition: {selectedTranslation?.definition}
            </li>
            <li className="list-group-item">
              example: {selectedTranslation?.example}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Translate;
