import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from './Loader';

const VerifyEmail = () => {
    const { verificationToken } = useParams();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const verifyEmail = async() => {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;

            try {
                setIsLoading(true);
                const response = await axios.get(`${backendUrl}/api/users/verifyEmail/${verificationToken}`);
                setIsLoading(false);
                
                if (response.status === 200) {
                    toast.success(response.data.message);
                    navigate('/completeregistraion');
                }

            } catch (error) {
                toast.error(error.response.data.message);
                navigate('/register');
            }

        };

        verifyEmail();

    }, [navigate, verificationToken])
  return (
    <div>{isLoading &&
        <Loader />
    }</div>
  )
}

export default VerifyEmail