import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(getCurrentTime());
    const [isFullScreen, setIsFullScreen] = useState('Full Screen');
    const [isSeconds, setIsSeconds] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }, []);

    function getCurrentTime() {
        const currentDate = new Date();
        let hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format

        // if (isSeconds) {
        //     return {
        //         time: `${formatTimeComponent(hours)}:${formatTimeComponent(minutes)}:${formatTimeComponent(seconds)}`,
        //         ampm: ampm,
        //     };
        // }

        return {
            time: `${formatTimeComponent(hours)}:${formatTimeComponent(minutes)}`,
            ampm: ampm,
        };
    }

    function formatTimeComponent(timeComponent) {
        return timeComponent < 10 ? `0${timeComponent}` : timeComponent;
    }
    function fullScreen() {
        console.log('full screen');
        if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullScreen('Full Screen');
        } else {
            document.documentElement.requestFullscreen();
            setIsFullScreen('Exit');
        }

    }
    function handleSeconds() {
        setIsSeconds(!isSeconds);
    }

    return (
        <>
            <div className='flex items-center justify-center w-screen h-screen relative'>
                <h1 className='text-9xl font-bold'>{currentTime.time}</h1>
                <span className="text-2xl font-medium">{currentTime.ampm}</span>
                <button className='rounded-md absolute bottom-10 right-10 border-black border-2 w-32 font-medium' onClick={fullScreen}>{isFullScreen}</button>
                <button className='rounded-md absolute bottom-10 left-10 border-black border-2 w-36 font-medium' onClick={handleSeconds}>{isSeconds ? "Show Seconds" : "Hide Seconds"}</button>
            </div>
        </>
    );
};

export default Clock;
