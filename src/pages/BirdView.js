import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBird, fetchBirdById } from '../api/ApiService';
import { PageDescription } from '../components/utils';
const API_URL = 'https://jigsawmakerapiappservicelinux.azurewebsites.net/api/static/';

/**
 * Page to view the bird detail
 * @returns 
 */
const BirdView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bird, setBird] = useState(null);

    useEffect(() => {
        const getBird = async () => {
            try {
                const data = await fetchBirdById(id);
                setBird(data);
            } catch (error) {
                console.error("Failed to fetch bird details", error);
            }
        };

        getBird();
    }, [id]);

    const handleDelete = async () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this bird?");
        if (isConfirmed) {
            try {
                await deleteBird(id);
                // Redirect to birds list after deletion
                navigate('/birds');
            } catch (error) {
                console.error("Failed to delete bird", error);
            }
        }
    };

    if (!bird) return <div>Loading...</div>;

    // Convert date string to a more readable format
    const formattedDate = new Date(bird.date).toLocaleDateString();

    return (
        <div className="container">
            <PageDescription>
                This is the Bird View page. It displays detailed information about a specific bird.
            </PageDescription>

            <h2 className="mt-3">Bird View</h2>
            <div className="row">
                <div className="col-md-6">
                    <img src={API_URL + bird.imageUrl} alt={bird.specie} className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <p><strong>Specie:</strong> {bird.specie}</p>
                    <p><strong>Location:</strong> {bird.location}</p>
                    <p><strong>Date:</strong> {formattedDate}</p>
                    <button className="btn btn-primary me-2" onClick={() => navigate(`/bird/${id}/edit`)}>Edit</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default BirdView;
