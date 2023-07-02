import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ExhibitService from "../services/exhibit.service";

const EditExhibit = () => {
  const { exhibitID } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    ExhibitService.getExhibit(exhibitID)
      .then((response) => {
        setTitle(response.title);
        setDescription(response.description);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [exhibitID]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realizar la actualización del exhibición utilizando ExhibitService
    ExhibitService.updateExhibit(exhibitID, {
      title: title,
      description: description,
    })
      .then(() => {
        navigate("/admin"); // Redirigir a la página de administrador después de la actualización
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Edit Exhibit</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditExhibit;


