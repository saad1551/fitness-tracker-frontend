import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from './Loader';

const Signout = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const signout = async () => {
            const backendUrl = "http://localhost:5000";

            try {
                setIsLoading(true);
                const response = await axios.get(`${backendUrl}/api/users/logout`);
                setIsLoading(false);

                if (response.status === 200) {
                    toast.success(response.data.message);
                    localStorage.removeItem('user');
                    navigate('/'); // Redirect to the landing page (home page)
                }

            } catch (error) {
                setIsLoading(false);
                toast.error(error.response.data.message);
                navigate('/'); // Redirect to home page even in case of error
            }
        };

        signout();

    }, [navigate]);

    return (
        <div>
            {isLoading && <Loader />}
        </div>
    );
};

export default Signout;
