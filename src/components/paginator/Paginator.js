import { useEffect, useState } from "react";

const Paginator = ({ data, getPageFn }) => {
  const [disabledNext, setDisabledNext] = useState(false);
  const [disabledPrev, setDisabledPrev] = useState(false);

  useEffect(() => {
    if (data.last_page <= data.current_page) {
      setDisabledNext(true);
    } else {
      setDisabledNext(false);
    }

    if (data.current_page === 1) {
      setDisabledPrev(true);
    } else {
      setDisabledPrev(false);
    }
  }, [data.last_page, data.current_page]);

  let pageCount = 0;
  if (data) {
    const pc = data.total / data.per_page;
    if (parseInt(pc) === pc) {
      pageCount = pc;
    } else {
      pageCount = parseInt(pc) + 1;
    }
  }

  let pagesDom = [];

  let minPage = data.current_page - 2;
  if (minPage <= 0) {
    minPage = 1;
  }

  let maxPage = data.current_page + 2;
  if (maxPage > data.last_page) {
    maxPage = data.last_page;
  }

  for (let i = minPage; i <= maxPage; i++) {
    pagesDom.push(
      <li key={i} className="page-item">
        <button
          value={i}
          className={"page-link" + (data.current_page === i ? " active" : "")}
          onClick={(e) => {
            getPageFn(e.target.value);
          }}
        >
          {i}
        </button>
      </li>
    );
  }
  const handelnext = async () => {
    const newPage = data.current_page + 1;
    if (data.last_page < newPage) {
      return;
    }

    await getPageFn(newPage);
  };
  const handelPrevious = async () => {
    const newPage = data.current_page - 1;
    if (data.current_page < 1) {
      return;
    }
    await getPageFn(newPage);
  };
  const handelStart = async () => {
    const newPage = (data.current_page = 1);
    if (data.current_page < 1) {
      return;
    }
    await getPageFn(newPage);
  };
  const handelEnd = async () => {
    const newPage = data.last_page;
    if (data.last_page < newPage) {
      return;
    }
    await getPageFn(newPage);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={"page-item " + (disabledPrev ? "disabled" : "")}>
              <button className="page-link" onClick={handelPrevious}>
                Previous
              </button>
            </li>
            <li className={"page-item " + (disabledPrev ? "d-none" : "")}>
              <button className="page-link" onClick={handelStart}>
                ...
              </button>
            </li>
            {pagesDom}
            <li className={"page-item " + (disabledNext ? "d-none" : "")}>
              <button className="page-link" onClick={handelEnd}>
                ...
              </button>
            </li>
            <li className={"page-item " + (disabledNext ? "disabled" : "")}>
              <button className="page-link" onClick={handelnext}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <span className="fst-italic fw-lighter">
        {data.from}-{data.to} from {data.total}
      </span>
    </div>
  );
};

export default Paginator;
