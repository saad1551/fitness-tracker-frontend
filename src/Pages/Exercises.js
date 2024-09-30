import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import Loader from '../Components/Loader';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ExerciseModal from '../Components/ExerciseModal';

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

//     bodyPart:"back"
// equipment:"cable"
// gifUrl:"https://v2.exercisedb.io/image/gIyI36lY3VAjMa"
// id:"0007"
// name:"alternate lateral pulldown"
// target:"lats"
// secondaryMuscles:
// instructions:


    const columns = [
        {
            name: 'Name',
            selector: row => row.name.toUpperCase(),
        },
        {
            name: 'Body Part',
            selector: row => row.bodyPart.toUpperCase(),
        },
        {
            name: 'Equipment',
            selector: row => row.equipment.toUpperCase(),
        },
        {
            name: 'Image',
            cell: row => <img src={row.gifUrl} alt="gif" width="100" height="100" />,
        },
        {
            name: 'Target',
            selector: row => row.target.toUpperCase(),
        },
        {
            name: 'Instructions',
            selector: row => row.instructions,
            omit: true
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

    // Filter data based on the search query and body part
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
        // Trigger some action when a row is clicked
        setExercise(row);
        setShowModal(true);
    };

  return (
    <div>
            {showModal && <ExerciseModal exercise={exercise} handleClose={()=>setShowModal(false)} />}
            <ButtonGroup aria-label="Basic example">
                {bodyPartList.map((part, index) => (
                    <Button
                        key={index}
                        onClick={(e) => handleToggle(e, part)}
                        variant="secondary"
                        style={{
                            color: selectedBodyPart === part ? "blue" : "gray", // Blue when selected, gray when not
                            backgroundColor: selectedBodyPart === part ? "lightblue" : "lightgray", // Background color change for better UX
                            borderColor: selectedBodyPart === part ? "blue" : "gray" // Border to visually match the color
                        }}
                    >
                        {part.toUpperCase()}
                    </Button>
                ))}
            </ButtonGroup>

            <input
                type="text"
                placeholder="Search exercises..."
                value={search}
                onChange={(e) => setSearch(e.target.value)} // Update search state
                style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
            />

            {isLoading && <Loader />}
            <DataTable columns={columns} data={filteredData} pagination
                            highlightOnHover
                            pointerOnHover // Changes cursor to pointer on hover
                            onRowClicked={handleRowClick} // Make rows clickable
            />
    </div>
  )
}

export default Exercises