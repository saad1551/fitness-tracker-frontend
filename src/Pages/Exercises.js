import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ExerciseModal from '../Components/ExerciseModal';
import Card from 'react-bootstrap/Card'; // Import Bootstrap Card
import ExerciseRow from './ExerciseRow';
import './Exercises.css'; // Import custom CSS

const Exercises = () => {
    const [exerciseData, setExerciseData] = useState([]);
    const [bodyPart, setBodyPart] = useState("back");
    const [isLoading, setIsLoading] = useState(false);
    const [bodyPartList, setBodyPartList] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [exercise, setExercise] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const exercisesPerPage = 10;

    useEffect(() => {
        const getBodyParts = async () => {
            const url = "https://exercisedb.p.rapidapi.com/exercises/bodyPartList";
            try {
                setIsLoading(true);
                const response = await axios.get(url, {
                    headers: {
                        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                        'x-rapidapi-key': process.env.REACT_APP_EXERCISES_API_KEY
                    }
                });
                setIsLoading(false);
                setBodyPartList(response.data);
            } catch (error) {
                toast.error(error.response.data.message);
                setIsLoading(false);
            }
        };
        getBodyParts();
    }, []);

    useEffect(() => {
        const getData = async () => {
            const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=500&offset=0`;
            try {
                setIsLoading(true);
                const response = await axios.get(url, {
                    headers: {
                        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                        'x-rapidapi-key': process.env.REACT_APP_EXERCISES_API_KEY
                    }
                });
                setIsLoading(false);
                setExerciseData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                toast.error(error.response.data.message);
                setIsLoading(false);
            }
        };
        getData();
        setSearch("");
    }, [bodyPart]);

    useEffect(() => {
        const result = exerciseData?.filter((exercise) => {
            return (
                exercise.name.toLowerCase().includes(search.toLowerCase()) ||
                exercise.equipment.toLowerCase().includes(search.toLowerCase()) ||
                exercise.target.toLowerCase().includes(search.toLowerCase())
            );
        });
        setFilteredData(result);
        setCurrentPage(1); // Reset to first page after filtering
    }, [search, exerciseData]);

    const cardStyles = {
        backgroundColor: "#111828",
        color: "white",
        marginBottom: "20px",
        textAlign: "center",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
    }

    // Pagination logic
    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentExercises = filteredData.slice(indexOfFirstExercise, indexOfLastExercise);
    const totalPages = Math.ceil(filteredData.length / exercisesPerPage);

    const handleBodyPartSelect = (part) => {
        setBodyPart(part);
    };

    const handleRowClick = (row) => {
        setExercise(row);
        setShowModal(true);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const goToFirstPage = () => {
        setCurrentPage(1);
    };

    const goToLastPage = () => {
        setCurrentPage(totalPages);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to create pagination window
    const getPaginationWindow = () => {
        const windowSize = 5;
        const start = Math.max(1, currentPage - Math.floor(windowSize / 2));
        const end = Math.min(totalPages, start + windowSize - 1);

        let pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
            <div className="exercises-container">
                {showModal && <ExerciseModal exercise={exercise} handleClose={() => setShowModal(false)} />}
        
                {/* Search and Total Exercises Container */}
                <div className="search-card-container">
                    <div className="exercises-search-container">
                        <input
                            type="text"
                            placeholder="Search exercises..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="exercises-search-input"
                        />
        
                        <DropdownButton
                            id="dropdown-basic-button"
                            title={bodyPart.toUpperCase()}
                            variant="outline-primary"
                            className="body-part-dropdown"
                            drop="end"
                        >
                            {bodyPartList.map((part, index) => (
                                <Dropdown.Item key={index} onClick={() => handleBodyPartSelect(part)}>
                                    {part.toUpperCase()}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>
        
                    {/* Total Exercises Card
                    <Card style={cardStyles}>
                        <Card.Body style={{padding: "20px"}}>
                            <Card.Title style={{  fontSize: "1.5rem", fontWeight: "bold"}}>Total Exercises</Card.Title>
                            <Card.Text style={{ fontSize: "1.2rem" }}>{exerciseData.length}</Card.Text>
                        </Card.Body>
                    </Card> */}

                    <div style={cardStyles}>
                        <div style={{ padding: "20px" }}>
                            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Total Exercises</h2>
                            <p style={{ fontSize: "1.2rem" }}>{exerciseData.length}</p>
                        </div>
                    </div>
                </div>
        
                {isLoading && <Loader />}
        
                {!isLoading && currentExercises.map((exercise) => (
                    <ExerciseRow key={exercise.id} exercise={exercise} onStart={(exercise) => handleRowClick(exercise)} />
                ))}
        
                {/* Pagination Controls */}
                <div className="pagination">
                    <button onClick={goToFirstPage} disabled={currentPage === 1}>
                        First
                    </button>
                    <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                        Previous
                    </button>
        
                    {getPaginationWindow().map((page) => (
                        <button
                            key={page}
                            onClick={() => paginate(page)}
                            className={page === currentPage ? 'active-page' : ''}
                        >
                            {page}
                        </button>
                    ))}
        
                    <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                    <button onClick={goToLastPage} disabled={currentPage === totalPages}>
                        Last
                    </button>
                </div>
            </div>
        );
};

export default Exercises;
