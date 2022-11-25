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
  for (let i = 1; i <= pageCount; i++) {
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

  return (
    <div>
      <div className="fixed-bottom">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={"page-item " + (disabledPrev ? "disabled" : "")}>
              <button className="page-link" onClick={handelPrevious}>
                Previous
              </button>
            </li>
            {pagesDom}
            <li className={"page-item " + (disabledNext ? "disabled" : "")}>
              <button className="page-link" onClick={handelnext}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Paginator;
