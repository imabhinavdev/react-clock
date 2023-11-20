import React, { useState, useEffect, useContext } from 'react';
import ThemeContext from '../../Context/ThemeContext';
import NoSleep from 'nosleep.js';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(getCurrentTime());
    const [isSeconds, setIsSeconds] = useState(false);
    const [showSettings, setshowSettings] = useState(false)



    const themeValues = useContext(ThemeContext);
    const { theme, updateTheme } = themeValues
    console.log(theme)
    useEffect(() => {
        const noSleep = new NoSleep();
        console.log('No Sleep Enabled')
        // Enable NoSleep
        noSleep.enable();
    }, []);
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
        const seconds = currentDate.getSeconds();
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

    function handleChangeTheme(theme) {
        updateTheme(theme)
    }
    function handleSettingChange() {
        setshowSettings(!showSettings)
    }

    const isMobile = window.innerWidth <= 768; // Adjust this breakpoint as needed

    return (
        <div className={`flex flex-col items-center justify-center h-screen relative ${isMobile ? 'mobile-view' : ''} {theme}`}>
            {isMobile && (
                <p className="text-center text-lg font-medium my-4">
                    Open this site on a desktop for the best experience.
                </p>
            )}
            <h1 className={`text-4xl md:text-9xl font-bold ${isMobile ? 'mb-4' : ''}`}>{currentTime.time}</h1>
            <span className={`text-xl md:text-2xl font-medium ${isMobile ? 'mb-4' : ''}`}>{currentTime.ampm}</span>
            <span className="material-symbols-outlined cursor-pointer" onClick={handleSettingChange}  >
                settings
            </span>
            {!isMobile && showSettings && (<>
                <div className='flex absolute bottom-10 left-10 right-10'>
                    <button className='rounded-md mx-2 border-black border-2 w-24 font-medium' onClick={fullscreenToggle}>
                        {document.fullscreenElement ? 'Exit Full Screen' : 'Full Screen'}
                    </button>
                    <button className='rounded-md mx-2 border-black border-2 w-24 font-medium' onClick={handleSeconds}>
                        {isSeconds ? 'Show Seconds' : 'Hide Seconds'}
                    </button>
                </div>
                <div className='flex absolute bottom-10  right-10'>
                    <button className='rounded-md mx-2 border-black border-2 w-28 font-medium' onClick={() => { handleChangeTheme('pinkBody') }}>
                        Theme 1
                    </button>
                    <button className='rounded-md mx-2 border-black border-2 w-28 font-medium' onClick={() => { handleChangeTheme('blueBody') }}>
                        Theme 2
                    </button>
                    <button className='rounded-md mx-2 border-black border-2 w-28 font-medium' onClick={() => { handleChangeTheme('yellowBody') }}>
                        Theme 3
                    </button>
                    <button className='rounded-md mx-2 border-black border-2 w-28 font-medium' onClick={() => { handleChangeTheme('darkBody') }}>
                        Theme 4
                    </button>
                </div></>
            )}
        </div>
    );
};

export default Clock;
