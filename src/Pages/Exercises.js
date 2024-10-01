import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import Loader from '../Components/Loader';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ExerciseModal from '../Components/ExerciseModal';
import './Exercises.css'; // Import CSS for responsive design

const Exercises = () => {
    const [exerciseData, setExerciseData] = useState();
    const [bodyPart, setBodyPart] = useState("back");
    const [isLoading, setIsLoading] = useState(false);
    const [bodyPartList, setBodyPartList] = useState([]);
    const [selectedBodyPart, setSelectedBodyPart] = useState("back");
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState();
    const [showModal, setShowModal] = useState(false);
    const [exercise, setExercise] = useState(null);

    const columns = [
        {
            name: 'Name',
            selector: row => row.name.toUpperCase(),
            sortable: true,
            wrap: true,  // Wrap text for better responsiveness
        },
        {
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
            name: 'Image',
            cell: row => <img src={row.gifUrl} alt="gif" className="data-table-image" />,
            ignoreRowClick: true, // Prevents click on image
            sortable: false,
        },
        {
            name: 'Target',
            selector: row => row.target.toUpperCase(),
            sortable: true,
            wrap: true,
        },
    ];

    useEffect(() => {        
        const getBodyParts = async() => {
            const url = "https://exercisedb.p.rapidapi.com/exercises/bodyPartList";

            try {
                setIsLoading(true);
                const response = await axios.get(url, {
                    headers: {
                        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                        'x-rapidapi-key': 'sdfqfd'
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
        const getData = async() => {
            const url = "https://exercisedb.p.rapidapi.com/exercises/bodyPart";

            try {
                setIsLoading(true);
                const response = await axios.get(`${url}/${bodyPart}?limit=500&offset=0`, {
                    headers: {
                        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                        'x-rapidapi-key': 'qdwqd'
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

    const handleToggle = (e, bodyPart) => {
        setSelectedBodyPart(bodyPart);
        setBodyPart(bodyPart);
    };

    const handleRowClick = (row) => {
        setExercise(row);
        setShowModal(true);
    };

  return (
    <div className="exercises-container">
        {showModal && <ExerciseModal exercise={exercise} handleClose={() => setShowModal(false)} />}
        
        <ButtonGroup aria-label="Basic example" className="btn-group">
            {bodyPartList.map((part, index) => (
                <Button
                    key={index}
                    onClick={(e) => handleToggle(e, part)}
                    variant="secondary"
                    style={{
                        color: selectedBodyPart === part ? "blue" : "gray",
                        backgroundColor: selectedBodyPart === part ? "lightblue" : "lightgray",
                        borderColor: selectedBodyPart === part ? "blue" : "gray"
                    }}
                >
                    {part.toUpperCase()}
                </Button>
            ))}
        </ButtonGroup>

        <input
            type="text"
            className="exercises-search-input"
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
        />

        {isLoading && <Loader />}

        <div className="responsive-table">
            <DataTable 
                columns={columns} 
                data={filteredData} 
                pagination
                highlightOnHover
                pointerOnHover
                responsive  // Make DataTable responsive
                onRowClicked={handleRowClick}
            />
        </div>
    </div>
  );
};

export default Exercises;
