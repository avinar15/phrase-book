import React from "react";
import { Link } from "react-router-dom";
import img from "../../images/img1.jpg";

function Landing() {
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-5 text-center text-md-start">
          <p className="display-5 text-muted">phrase book</p>
          <p className="fst-italic fw-lighter">
            I personally love using language learning apps to slowly go through
            the words in my bed before bed.{" "}
          </p>
          <p className="fst-italic fw-lighter">
            The advantage of the language learning application is that it is
            always with you
          </p>
          <p className="fst-italic fw-lighter">
            A method that includes images, sound and video can be much more
            effective and motivating! Additionally, one can receive immediate
            corrections or feedback. No need to wait for correction.
          </p>
          <p className="fst-italic fw-lighter">
            Yes, learning is possible while having fun
          </p>
          <Link className="btn btn-primary btn-lg" to={`/login`}>
            Let's go
          </Link>
        </div>
        <div className="col-md-5 text-center">
          <img src={img} alt="" className="img-fluid mt-5" />
        </div>
      </div>
      {/* footer */}
      <div id="footer" className="container-fluid">
        <div className="row">
          <div className="col-12 bg-light mt-5 align-items-end">
            <div className="text-center pt-3">
              <h3>The world of learning</h3>
              <p className="fst-italic fw-lighter my-4">
                This is a personal application for better and easier learning of
                English that you can use to help yourself in the field of
                language...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
