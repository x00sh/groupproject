import React from 'react';
import { Button } from 'govuk-react';
import { Link } from 'react-router-dom';

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:4000/logout', {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Link to="/">
            <Button onClick={handleLogout} buttonColour="red"> Logout </Button>
        </Link>
    );
};

export default LogoutButton;
