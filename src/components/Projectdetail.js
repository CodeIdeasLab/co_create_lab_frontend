import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import dateFormat from "dateformat";
import { BiArrowBack } from "react-icons/bi";
import { MdOutlineDescription } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { BsBookmarkStarFill } from "react-icons/bs";
import { BsBookmarkStar } from "react-icons/bs";
export default function Projectdetail() {
  const { id } = useParams();
  const navigation = useNavigate();
  const [projectdetail, setProjectdetail] = useState([]);
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setBookmarked(!bookmarked);
  };
  const goBack = () => {
    navigation(-1);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8080/projects/${id}`)
      .then((response) => {
        setProjectdetail(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container projectdetail mt-4 mb-4">
      <div className="col-md-7 mx-auto">
        <div className="bg-light rounded-3 shadow-sm">
          <div className="mx-4 pt-4 bg-light bookmark">
            <h2 className="bg-light detailsPage ">
              {projectdetail.project_name}
            </h2>{" "}
            <p className="bg-light" onClick={handleBookmarkClick}>
              {bookmarked ? (
                <BsBookmarkStarFill
                  size={25}
                  style={{ fill: "orange", backgroundColor: "white" }}
                />
              ) : (
                <BsBookmarkStar
                  size={25}
                  style={{ backgroundColor: "white" }}
                />
              )}
            </p>
          </div>
          <hr className="solid mx-4 p-0"></hr>
          <div className="container bg-light">
            <div className="row row-cols-2 mx-1 bg-light">
              <div className="bg-light">
                <p className="bg-light detailsFont m-0">
                  <span className="me-1">
                    {" "}
                    <BsPencilSquare />
                  </span>
                  Posted
                </p>
                <p className="bg-light ms-3">
                  {dateFormat(projectdetail.createdAt, "d. mmmm yyyy")}
                </p>
              </div>
              <div className="bg-light">
                <p className="bg-light m-0 detailsFont">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="bi bi-calendar2-plus projectoverviewicon"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                    <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM8 8a.5.5 0 0 1 .5.5V10H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V11H6a.5.5 0 0 1 0-1h1.5V8.5A.5.5 0 0 1 8 8z" />
                  </svg>
                  <span className="bg-light detailsFont">Start date</span>
                </p>
                <p className="bg-light ms-3">{projectdetail.start_date}</p>
              </div>
              <div className="bg-light ">
                <p className="bg-light my-0 detailsFont">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="bi bi-geo-alt-fill projectoverviewicon"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>
                  <span className="bg-light detailsFont">Location</span>
                </p>
                <p className="bg-light ms-3 my-0">{projectdetail.location}</p>
              </div>
            </div>
            <hr className="solid mx-3"></hr>
          </div>
          <div className="container bg-light">
            <div className="row row-cols-2 ms-1">
              <div className="bg-light">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="bi bi-tags-fill projectoverviewicon"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                  <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                </svg>
                <span className="bg-light detailsFont">Category:</span>
                {projectdetail.categories?.map((category, i) => {
                  return (
                    <div className="bg-light" key={i}>
                      <ul className="bg-light m-0">
                        <li className="bg-light">{category}</li>
                      </ul>
                    </div>
                  );
                })}
              </div>
              <div className="bg-light">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="bi bi-tags-fill projectoverviewicon"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                  <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                </svg>
                <span className="bg-light detailsFont">Tech stack:</span>
                {projectdetail.tech_stack?.map((stack, i) => {
                  return (
                    <div className="bg-light" key={i}>
                      <ul className="bg-light m-0">
                        {" "}
                        <li className="bg-light">{stack}</li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="bg-light mt-2 ">
            <div className="bg-light mx-4">
              <hr className="solid"></hr>
              <MdOutlineDescription />
              <span className="bg-light detailsFont">Description</span>
              <p className="bg-light">{projectdetail.description}</p>
              <hr className="solid mx-autos"></hr>
            </div>
            <div className="bg-light text-center mb-2 pb-3">
              Contact
              <span
                onClick={() => (window.location = "mailto:yourmail@domain.com")}
              >
                <IoMdMail size={25} />
              </span>
            </div>
          </div>
        </div>
        <div className="backDiv">
          <button
            className="backBtn text-start p-0 my-2"
            type="button"
            onClick={goBack}
          >
            <BiArrowBack />
            Back to Search
          </button>
        </div>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Project|CoCreateLab</title>
        <link rel="canonical" href="/projects/" />
      </Helmet>
    </div>
  );
}
