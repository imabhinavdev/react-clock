//Clock
import React, { useEffect, useState } from 'react'

const Clock = () => {

    const [hour, setHour] = useState(new Date().getHours())
    const [minute, setMinute] = useState(new Date().getMinutes())
    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
            hours = hours === 0 ? 12 : hours; // If it's 12 AM, display 12
            const paddedHours = hours < 10 ? `0${hours}` : hours; // Pad single digit hours with leading zero
            const paddedMinutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(); // Pad single digit minutes with leading zero

            setHour(paddedHours);
            setMinute(paddedMinutes);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex items-center justify-center h-full  '>
            <span className='text-[30rem] font-bold glass-bg '>{hour}</span>
            <span className='text-[30rem] font-bold'>:</span>
            <span className='text-[30rem] font-bold glass-bg '>{minute}</span>
        </div>
    )
}

export default Clock