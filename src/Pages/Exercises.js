import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import Loader from '../Components/Loader';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Exercises = () => {
    const [exerciseData, setExerciseData] = useState();
    const [bodyPart, setBodyPart] = useState("back");
    const [isLoading, setIsLoading] = useState(false);
    const [bodyPartList, setBodyPartList] = useState([]);
    const [selectedBodyPart, setSelectedBodyPart] = useState("back");

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
    ];

    useEffect(() => {        
        const getBodyParts = async() => {
            const url = "https://exercisedb.p.rapidapi.com/exercises/bodyPartList";

            try {
                setIsLoading(true);
                const response = await axios.get(url, {
                    headers: {
                        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                        'x-rapidapi-key': '4683bdcec5msh3e8caf97e9fada0p1adcc0jsndaff4c98ce88'
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
                        'x-rapidapi-key': '4683bdcec5msh3e8caf97e9fada0p1adcc0jsndaff4c98ce88'
                    }
                });
                setIsLoading(false);
                setExerciseData(response.data);
            } catch (error) {
                toast.error(error.response.data.message);
                setIsLoading(false);
            }
        };

        getData();
    }, [bodyPart]);

    const handleClick = (e, bodyPart) => {
        setSelectedBodyPart(bodyPart);

        setBodyPart(bodyPart);
    };

  return (
    <div>
            <ButtonGroup aria-label="Basic example">
                {bodyPartList.map((part, index) => (
                    <Button
                        key={index}
                        onClick={(e) => handleClick(e, part)}
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

        {isLoading && <Loader />}
        <DataTable columns={columns} data={exerciseData} pagination/>
    </div>
  )
}

export default Exercises