import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExhibitService from '../services/exhibit.service';

const CreateExhibit = () => {
  const [title, setTitle] = useState('');
  const [shortDescURL, setShortDescURL] = useState('');
  const [founder, setFounder] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const navigate = useNavigate();

  // Procedimiento guardar
  const store = async (e) => {
    e.preventDefault();
    await ExhibitService.createExhibit(
      title,
      shortDescURL,
      founder,
      creationDate,
      categoryID
    );
    navigate('/');
  };

  return (
    <div>
      <h3>Create Exhibit</h3>
      <form onSubmit={store}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Short Description URL</label>
          <input
            value={shortDescURL}
            onChange={(e) => setShortDescURL(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Founder</label>
          <input
            value={founder}
            onChange={(e) => setFounder(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Creation Date</label>
          <input
            value={creationDate}
            onChange={(e) => setCreationDate(e.target.value)}
            type="date"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category ID</label>
          <input
            value={categoryID}
            onChange={(e) => setCategoryID(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Store
        </button>
      </form>
    </div>
  );
};

export default CreateExhibit;
