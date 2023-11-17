import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(getCurrentTime());
    const [isSeconds, setIsSeconds] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 1000);

        const handleKeyDown = (event) => {
            if (document.fullscreenElement) {
                event.preventDefault();
                if (!(event.ctrlKey && event.key === 'l')) {
                    event.stopPropagation(); // Stop other key events when in fullscreen
                }
            } else {
                if (event.ctrlKey && event.key === 'l') {
                    exitFullscreen();
                }

                if (event.key === 'F11' && fullscreenEnabled()) {
                    event.preventDefault(); // Prevent default behavior of F11
                    if (!document.fullscreenElement) {
                        requestFullscreen();
                    }
                }
            }
        };

        const handleFullScreenChange = () => {
            if (document.fullscreenElement) {
                document.addEventListener('keydown', handleKeyDown);
            } else {
                document.removeEventListener('keydown', handleKeyDown);
            }
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, []);

    function getCurrentTime() {
        const currentDate = new Date();
        let hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format

        return {
            time: `${formatTimeComponent(hours)}:${formatTimeComponent(minutes)}`,
            ampm: ampm,
        };
    }

    function formatTimeComponent(timeComponent) {
        return timeComponent < 10 ? `0${timeComponent}` : timeComponent;
    }

    function requestFullscreen() {
        const element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    function fullscreenToggle() {
        if (document.fullscreenElement) {
            exitFullscreen();
        } else {
            requestFullscreen();
        }
    }

    function fullscreenEnabled() {
        return document.fullscreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled;
    }

    function handleSeconds() {
        setIsSeconds(!isSeconds);
    }

    return (
        <>
            <div className='flex items-center justify-center w-screen h-screen relative'>
                <h1 className='text-9xl font-bold'>{currentTime.time}</h1>
                <span className="text-2xl font-medium">{currentTime.ampm}</span>
                <button className='rounded-md absolute bottom-10 right-10 border-black border-2 w-32 font-medium' onClick={fullscreenToggle}>{document.fullscreenElement ? 'Exit Full Screen' : 'Full Screen'}</button>
                <button className='rounded-md absolute bottom-10 left-10 border-black border-2 w-36 font-medium' onClick={handleSeconds}>{isSeconds ? 'Show Seconds' : 'Hide Seconds'}</button>
            </div>
        </>
    );
};

export default Clock;
