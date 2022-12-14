import React, { useEffect, useState } from "react";
import Paginator from "../paginator/Paginator";
import ReviewStatus from "../ReviewStatus/ReviewStatus";
import { Link } from "react-router-dom";
import Loading from "../loading/loading";
import "bootstrap-icons/font/bootstrap-icons.css";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import WordInfo from "../wordInfo/WordInfo";
import WordService from "../../services/word-service";
import { useSpeechSynthesis } from "react-speech-kit";

const Words = () => {
  const [pgn, setPgn] = useState([]);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const wordService = new WordService();
  const { speak } = useSpeechSynthesis();
  const [perPage, setPerpage] = useState(10);

  //#region modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }
  function showModal() {
    setIsModalOpen(true);
  }
  //#endregion modal

  const getWords = async (page, perPage) => {
    setLoading(true);
    const response = await wordService.index(page, perPage);
    const responseData = response.data;
    setPgn(responseData);
    setLoading(false);
  };

  useEffect(() => {
    getWords(1, perPage);
  }, []);

  function wordInfo(e) {
    setLoading(true);
    const id = e.target.dataset.value;
    wordService.info(id).then((res) => {
      setInfo(res.data);
      setLoading(false);
      showModal();
    });
  }

  const handleDelete = (e) => {
    if (!window.confirm("Are you sure you wish to delete this item?")) {
      return;
    }
    setLoading(true);
    const id = e.target.dataset.value;
    wordService
      .delete(id)
      .then((res) => {
        toastr.success(res.data.message);
        getWords(1, perPage);
        setLoading(false);
      })
      .catch((err) => {
        const error = err?.response?.data?.message;
        toastr.error(error);
        setLoading(false);
      });
  };

  let wordsDom;
  if (pgn && pgn.data) {
    wordsDom = pgn.data.map((w, index) => {
      return (
        <tr key={index} className="">
          <td>
            <span
              className="btn btn-link bi bi-trash"
              onClick={handleDelete}
              data-value={w.id}
            ></span>
            <Link
              className="btn btn-link bi bi-pencil-square"
              to={`/words/${w.id}/edit`}
            ></Link>
            <Link
              className="btn btn-link bi bi-translate"
              to={`/words/${w.id}/translate`}
            ></Link>
            <span
              className="btn mx-2 btn-link bi bi-info-circle"
              onClick={wordInfo}
              data-value={w.id}
            ></span>
            <span
              className="btn btn-link bi bi-megaphone"
              onClick={() => speak({ text: w.word })}
            ></span>
          </td>
          <td>{index + pgn.from}</td>
          <td>{w.word}</td>
          <td>
            {w.last_review && new Date(w.last_review).toLocaleDateString()}
          </td>
          <td>{w.created_at && new Date(w.created_at).toLocaleDateString()}</td>
          <td>{w.updated_at && new Date(w.updated_at).toLocaleDateString()}</td>
          <td>{w.archived ? <>Yes</> : <>No</>}</td>
          <td>
            <ReviewStatus word={w} />
          </td>
          <td>{w.step_id}</td>
        </tr>
      );
    });
  }

  const updatePerpage = (e) => {
    const newPage = e.target.dataset.value;
     setPerpage(newPage);
     getWords(1, newPage);
  };

  return (
    <div>
      <Loading loading={loading} />
      <div className="h3 pb-2 border-4 mb-4 text-center border-bottom ">
        MY WORDS
      </div>

      <div className="d-flex justify-content-between align-item-center ">
        <div className="my-2 mx-4 ">
          <Link className="btn btn-outline-primary" to={`/words/create`}>
            Add Words
          </Link>
        </div>
        <div className="dropdown mx-4">
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            perpage:{perPage}
          </button>
          <ul className="dropdown-menu">
            <li>
              <span
                className="dropdown-item"
                data-value="10"
                onClick={updatePerpage}
              >
                10
              </span>
            </li>
            <li>
              <span
                className="dropdown-item"
                data-value="20"
                onClick={updatePerpage}
              >
                20
              </span>
            </li>
            <li>
              <span
                className="dropdown-item"
                data-value="50"
                onClick={updatePerpage}
              >
                50
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table container">
          <thead>
            <tr className="border container">
              <th></th>
              <th className="border-end col-md-1">Index</th>
              <th className="border-end col ">Word</th>
              <th className="border-end col">Last Review</th>
              <th className="border-end col">Created</th>
              <th className="border-end col">Updated</th>
              <th className="border-end col-md-1">Archived</th>
              <th className="container border-end col-md-1">status</th>
              <th className="border-end col-md-1">Step Id</th>
            </tr>
          </thead>
          {pgn && pgn.data && <tbody>{wordsDom}</tbody>}
        </table>
      </div>

      <div className="mt-4">
        <Paginator data={pgn} getPageFn={getWords} />
      </div>

      <div
        className={
          "modalDialogInfo " + (isModalOpen ? "show-modal" : "hide-modal")
        }
      >
        <div className="modalBodyInfo bg-light">
          <button
            title="Close"
            className="btn btn-danger rounded-circle close"
            onClick={closeModal}
          >
            X
          </button>

          <WordInfo data={info} />
        </div>
      </div>
    </div>
  );
};

export default Words;
