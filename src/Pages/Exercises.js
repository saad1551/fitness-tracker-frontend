import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import Loader from '../Components/Loader';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ExerciseModal from '../Components/ExerciseModal';
import { useMediaQuery } from 'react-responsive';
import './Exercises.css';

const Exercises = () => {
    const [exerciseData, setExerciseData] = useState([]);
    const [bodyPart, setBodyPart] = useState("back");
    const [isLoading, setIsLoading] = useState(false);
    const [bodyPartList, setBodyPartList] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [exercise, setExercise] = useState(null);

    const isMobileView = useMediaQuery({ query: '(max-width: 768px)' });

    const columns = [
        {
            name: 'Name',
            selector: row => row.name.toUpperCase(),
            sortable: true,
            wrap: true,
        },
        !isMobileView && {
            name: 'Body Part',
            selector: row => row.bodyPart.toUpperCase(),
            sortable: true,
            wrap: true,
        },
        {
            name: 'Equipment',
            selector: row => row.equipment.toUpperCase(),
            sortable: true,
            wrap: true,
        },
        {
            name: 'Target',
            selector: row => row.target.toUpperCase(),
            sortable: true,
            wrap: true,
        },
        {
            name: 'Image',
            cell: row => <img src={row.gifUrl} alt="gif" className="data-table-image" />,
            ignoreRowClick: true,
            sortable: false,
            maxWidth: "150px",
        },
    ].filter(Boolean);

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
    }, [search, exerciseData]);

    const handleBodyPartSelect = (part) => {
        setBodyPart(part);
    };

    const handleRowClick = (row) => {
        setExercise(row);
        setShowModal(true);
    };

    return (
        <div className="exercises-container">
            {showModal && <ExerciseModal exercise={exercise} handleClose={() => setShowModal(false)} />}

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
                    drop="end" // Makes dropdown open to the right
                >
                    {bodyPartList.map((part, index) => (
                        <Dropdown.Item key={index} onClick={() => handleBodyPartSelect(part)}>
                            {part.toUpperCase()}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            </div>

            {isLoading && <Loader />}
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                pointerOnHover
                responsive
                onRowClicked={handleRowClick}
                className="data-table"
            />
        </div>
    );
};

export default Exercises;
