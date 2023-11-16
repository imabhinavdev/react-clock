import React, { useState, useEffect } from 'react';
import screenfull from 'screenfull';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(getCurrentTime());
    const [isSeconds, setIsSeconds] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 1000);

        const handleKeyDown = (event) => {
            if (screenfull.isFullscreen) {
                event.preventDefault();
                if (!(event.ctrlKey && event.key === 'l')) {
                    event.stopPropagation(); // Stop other key events when in fullscreen
                }
            } else {
                if (event.ctrlKey && event.key === 'l') {
                    screenfull.exit();
                }

                if (event.key === 'F11' && screenfull.enabled) {
                    event.preventDefault(); // Prevent default behavior of F11
                    if (!screenfull.isFullscreen) {
                        screenfull.request();
                    }
                }
            }
        };

        const handleFullScreenChange = () => {
            if (screenfull.isFullscreen) {
                document.addEventListener('keydown', handleKeyDown);
            } else {
                document.removeEventListener('keydown', handleKeyDown);
            }
        };

        screenfull.on('change', handleFullScreenChange);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener('keydown', handleKeyDown);
            screenfull.off('change', handleFullScreenChange);
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

    function handleSeconds() {
        setIsSeconds(!isSeconds);
    }

    return (
        <>
            <div className='flex items-center justify-center w-screen h-screen relative'>
                <h1 className='text-9xl font-bold'>{currentTime.time}</h1>
                <span className="text-2xl font-medium">{currentTime.ampm}</span>
                <button className='rounded-md absolute bottom-10 right-10 border-black border-2 w-32 font-medium' onClick={screenfull.toggle}>{screenfull.isFullscreen ? 'Exit Full Screen' : 'Full Screen'}</button>
                <button className='rounded-md absolute bottom-10 left-10 border-black border-2 w-36 font-medium' onClick={handleSeconds}>{isSeconds ? 'Show Seconds' : 'Hide Seconds'}</button>
            </div>
        </>
    );
};

export default Clock;
