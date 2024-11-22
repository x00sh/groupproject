import React, { useState } from 'react';
import { Input, LabelText, Select, Button } from 'govuk-react';
import { CurrentContext } from '../Booking';
import { useContext } from 'react';

function BookingInput() {
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const { email, NHS } = useContext(CurrentContext);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };


    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };


    const handleBookingSubmit = () => {
        if (!selectedDate || !selectedTime) {
            alert('Please fill in all fields');
            return;
        }

        const bookingData = { selectedDate, selectedTime, email, NHS };

        fetch('http://localhost:4000/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if (data.success) {
                  
                    alert(data.message);
                    setSelectedDate('');
                    setSelectedTime('');
                    window.location.reload(); 
                } else {
                    alert(data.message);
                }
            })

            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };



    const times = [
        '9:00',
        '9:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
    ];

    return (
        <>
            <div>
                <LabelText>Choose a date:</LabelText>
                <Input type="date" onChange={handleDateChange} />
            </div>
            <div>
                <br />
                <LabelText>Choose a time:</LabelText>
                <Select name="time" value={selectedTime} onChange={handleTimeChange}>
                    <option value="">Select time</option>
                    {times.map((time) => (
                        <option key={time} value={time}>
                            {time}
                        </option>

                    ))}


                </Select>
            </div>
            <br />
            <div>
                <Button onClick={handleBookingSubmit}>Book Appointment</Button>
            </div>
        </>
    );
}
export default BookingInput;    