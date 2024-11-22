import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from 'govuk-react';
import { Link } from 'react-router-dom';

const DeregisterButton = ({ onClick }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeregister = () => {
        setShowConfirmation(true);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    const handleConfirm = () => {
        setShowConfirmation(false);
        fetch('http://localhost:4000/deregister', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include any authentication credentials here
            },
            body: JSON.stringify({
                // Include any necessary data here
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Account has been deleted');
                    handleLogout(); // log out the user
                    window.location.href = '/'; // redirect to the home page
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error(error);
                alert('An error occurred while trying to deregister');
            });
    };

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
        <>
            <Button onClick={handleDeregister}>Deregister</Button>
            {showConfirmation && (
                <div>
                    <p>Are you sure you want to deregister?</p>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </div>
            )}
        </>
    );
};

DeregisterButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default DeregisterButton;
