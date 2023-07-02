import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExhibitService from "../services/exhibit.service";

const BoardAdmin = () => {
  const [exhibits, setExhibits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    ExhibitService.getAllExhibit()
      .then((response) => {
        setExhibits(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteExhibit = (exhibitID) => {
    ExhibitService.deleteExhibit(exhibitID)
      .then(() => {
        setExhibits(exhibits.filter((exhibit) => exhibit.exhibitID !== exhibitID));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const redirectToEdit = (exhibitID) => {
    navigate(`/edit/${exhibitID}`);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Link to="/create" className="btn btn-primary mt-2 mb-2">
            <i className="fas fa-plus"></i>
          </Link>
          <table className="table">
            <thead className="table-primary">
              <tr>
                <th>Title</th>
                <th>Short Description</th>
                <th>Founder</th>
                <th>Creation Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exhibits.map((exhibit) => (
                <tr key={exhibit.exhibitID}>
                  <td>{exhibit.title}</td>
                  <td>{exhibit.short_desc_url}</td>
                  <td>{exhibit.founder}</td>
                  <td>{exhibit.creation_date}</td>
                  <td>
                    <Link to={`/edit/${exhibit.exhibitID}`} className="btn btn-info">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      onClick={() => deleteExhibit(exhibit.exhibitID)}
                      className="btn btn-danger"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BoardAdmin;






