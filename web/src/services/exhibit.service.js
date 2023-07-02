import axios from "axios";

const API_URL = "http://localhost:3000/api/crud";

const getAllExhibit = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};   

const getExhibit = async (exhibitID) => {
    try {
        const response = await axios.get(`${API_URL}/exhibit/${exhibitID}`); 
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const createExhibit = async (title, short_desc_url, founder, creation_date, categoryID) => { 
    try {
        const response = await axios.post(`${API_URL}/createExhibit`, {
            title: title,
            short_desc_url: short_desc_url,
            founder: founder,
            creation_date: creation_date,
            categoryID: categoryID
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};


const updateExhibit = async (exhibitID, title, short_desc_url, founder, creation_date, categoryID) => { 
    try {
        const response = await axios.put(`${API_URL}/updateExhibit/${exhibitID}`, {
            title: title,
            short_desc_url: short_desc_url,
            founder: founder,
            creation_date: creation_date,
            categoryID: categoryID
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};


const deleteExhibit = async (exhibitID) => {
    try {   
        const response = await axios.delete(`${API_URL}/deleteExhibit/${exhibitID}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const ExhibitService = {
    getAllExhibit,
    getExhibit,
    createExhibit,
    updateExhibit,
    deleteExhibit,
};

export default ExhibitService;