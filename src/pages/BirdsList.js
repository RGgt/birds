import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteBird, fetchBirds } from '../api/ApiService';
import { PageDescription } from '../components/utils';

const API_URL = 'https://jigsawmakerapiappservicelinux.azurewebsites.net/api/static/';

/**
 * Birds page: Display the list of birds
 */
const BirdsList = () => {
    const navigate = useNavigate();
    const [birds, setBirds] = useState([]);

    useEffect(() => {
        getBirds();
    }, []);

    // Load birds
    const getBirds = async () => {
        try {
            const data = await fetchBirds(1, 10);
            setBirds(data);
        } catch (error) {
            console.error("Failed to fetch birds", error);
        }
    };

    // Delete birds with confirmation
    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this bird?");
        if (isConfirmed) {
            try {
                await deleteBird(id);
                setBirds(birds.filter(bird => bird.id !== id));
            } catch (error) {
                console.error("Failed to delete bird", error);
            }
        }
    };

    return (
        <div>
            <PageDescription>
                This is the Birds List page. It displays a list of birds with their details. Click on VIEW for a bird to view its details.
            </PageDescription>

            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Birds List</h2>
                    <button className="btn btn-primary" onClick={() => navigate('/bird/new')}>Add New Bird</button>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Specie</th>
                            <th scope="col">Location</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {birds.map(bird => (
                            <tr key={bird.id}>
                                <td>
                                    <img src={API_URL + bird.imageUrl} alt={bird.specie} className="img-thumbnail" style={{ width: '100px', height: '100px' }} />
                                </td>
                                <td>{bird.specie}</td>
                                <td>{bird.location}</td>
                                <td>{bird.date}</td>
                                <td>
                                    <Link to={`/bird/${bird.id}`} className="btn btn-primary me-2">View</Link>
                                    <button onClick={() => handleDelete(bird.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* {birds.map(bird => (
                <div key={bird.id}>
                    <img src={bird.image_url} alt={bird.specie} style={{ width: '100px', height: '100px' }} />
                    <p>{bird.specie} - {bird.location} - {bird.date}</p>
                    <button onClick={() => handleDelete(bird.id)}>Delete</button>
                    <Link to={`/bird/${bird.id}`}>View Details</Link>
                </div>
            ))} */}
        </div>
    );
};

export default BirdsList;
