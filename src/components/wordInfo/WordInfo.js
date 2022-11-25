import ReviewStatus from "../ReviewStatus/ReviewStatus";
import "./wordInfo.css";
import { useSpeechSynthesis } from "react-speech-kit";

const WordInfo = ({ data }) => {
  const { speak } = useSpeechSynthesis();
  let lanInfo = null;
  if (data && data.translations) {
    lanInfo = data.translations.map((a, index) => {
      return (
        <tr key={index} className="tr-tr-info">
          <td className="">{a.language_alpha2code} : زبان </td>
          <td className="">ترجمه : {a.translation}</td>
          <td className="">تعریف : {a.definition}</td>
          <td className="">مثال : {a.example}</td>
          <td className="">
            ایجاد :{" "}
            {a.created_at && new Date(a.created_at).toLocaleDateString()}
          </td>
          <td className="">
            اپدیت :{" "}
            {a.updated_at && new Date(a.updated_at).toLocaleDateString()}
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="container">
      <div className="bg-light rounded ">
        <div className="border-bottom border-secondary">
          <div className="border-bottom border-secondary fs-4 fw-bold">
            Word: {data.word}
            <span
              className="btn btn-link bi bi-megaphone"
              onClick={() => speak({ text: data.word })}
            ></span>
          </div>
          <div className="border-bottom border-secondary fs-5 fst-italic">
            Language type: {data.language_alpha2code}
          </div>
          <div className="border-bottom border-secondary fs-5 fst-italic">
            creation date :{" "}
            {data.created_at && new Date(data.created_at).toLocaleDateString()}
          </div>
          <div className="border-bottom border-secondary fs-5 fst-italic">
            Update history :{" "}
            {data.updated_at && new Date(data.created_at).toLocaleDateString()}
          </div>
          <div className="fs-5 fst-italic d-flex mb-4">
            status : <div className="px-3"><ReviewStatus word={data} /></div>
          </div>
        </div>
        <table className="tdInfo ">
          <tbody className="trInfo">{lanInfo}</tbody>
        </table>
      </div>
    </div>
  );
};

export default WordInfo;
