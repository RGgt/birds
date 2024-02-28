import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBirdById, postBird, putBird } from '../api/ApiService';
import { PageDescription } from '../components/utils';
const API_URL = 'https://jigsawmakerapiappservicelinux.azurewebsites.net/api/static/';

/**
 * Birds detail page
 */
const BirdDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bird, setBird] = useState({ specie: '', location: '', date: '', imageUrl: null });
    const [file, setFile] = useState(null);

    // Load a single page by id provided in path param
    useEffect(() => {
        if (id) {
            const getBird = async () => {
                try {
                    const data = await fetchBirdById(id);
                    setBird({ ...data, imageUrl: data.imageUrl ? data.imageUrl : null, date: data.date.split('T')[0] });
                } catch (error) {
                    console.error("Failed to fetch bird details", error);
                }
            };

            getBird();
        }
    }, [id]);

    // State change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBird({ ...bird, [name]: value });
    };

    // File state change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Remove attached file
    const removeFile = () => {
        setFile(null);
        if (id && bird.imageUrl) {
            setBird({ ...bird, imageUrl: null });
        }
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('specie', bird.specie);
        formData.append('location', bird.location);
        formData.append('date', bird.date);
        if (file) formData.append('file', file);

        try {
            if (id) {
                await putBird(id, formData);
            } else {
                await postBird(formData);
            }
            navigate('/birds');
        } catch (error) {
            console.error("Failed to submit bird", error);
        }
    };

    return (
        <div className="container">
            <PageDescription>
                This is the Add New Bird page. You can add a new bird by filling out the form fields and uploading an image.
            </PageDescription>

            <h2>{id ? 'Edit Bird' : 'Add New Bird'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="specie" className="form-label">Specie:</label>
                    <input type="text" className="form-control" id="specie" name="specie" value={bird.specie} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location:</label>
                    <input type="text" className="form-control" id="location" name="location" value={bird.location} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date:</label>
                    <input type="date" className="form-control" id="date" name="date" value={bird.date} onChange={handleChange} required />
                </div>
                {bird.imageUrl || !id ? (
                    <div className="mb-3">
                        {bird.imageUrl && (
                            <div>
                                <img src={API_URL + bird.imageUrl} alt="Current" style={{ width: '100px', height: '100px' }} />
                                <button type="button" className="btn btn-danger ms-2" onClick={removeFile}>Remove</button>
                            </div>
                        )}
                        {!bird.imageUrl && (
                            <div>
                                <label htmlFor="image" className="form-label">Image:</label>
                                <input type="file" className="form-control" id="image" name="image" onChange={handleFileChange} />
                            </div>
                        )}
                    </div>
                ) : null}
                <button type="submit" className="btn btn-primary">{id ? 'Update Bird' : 'Add Bird'}</button>
            </form>
        </div>
    );
};

export default BirdDetail;
