import React, { useRef } from 'react'

export default function Player({ songs, setSongs, audioElem, isPlaying, setIsPlaying, currentSong, setCurrentSong, seekValue, setSeekValue, duration, calculateTime }) {

    // const [ seekValue, setSeekValue ] = useState(currentSong.progress);

    // console.log(currentSong)
    const clickRef = useRef();

    const playPause = () => {
        setIsPlaying(!isPlaying)
        console.log(isPlaying);
    }

    const checkWidth = (e) => {
        let width = clickRef.current.clientWidth;
        let offset = e.nativeEvent.offsetX;

        let divprogress = offset / width * 100;
        audioElem.current.currentTime = divprogress / 100 * currentSong.duration;
    }

    const skipBack = () => {

        const index = songs.findIndex(x=>x.title === currentSong.title);
        if (index === 0) {
        setCurrentSong(songs[songs.length - 1])
        }
        else {
        setCurrentSong(songs[index - 1])
        }
        audioElem.current.currentTime = 0;
        setIsPlaying(false);
        
    }


  const skiptoNext = () => {

    const index = songs.findIndex(x => x.title === currentSong.title);

    if (index === songs.length-1) {
      setCurrentSong(songs[0])
    }
    else {
      setCurrentSong(songs[index + 1])
    }
    audioElem.current.currentTime = 0;
    setIsPlaying(false);
    
  }

    

    const playingStyle = {
        color: 'var(--Accent)'
    }

    return (
        <div className="music-player d-flex align-items-center">
            <div className="player px-4">
                <div className="d-flex justify-content-center">
                    <button className="btn back-btn" type="button" onClick={skipBack}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-96 0 512 512" width="1em" height="1em" fill="currentColor">
                            {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                            <path d="M31.1 64.03c-17.67 0-31.1 14.33-31.1 32v319.9c0 17.67 14.33 32 32 32C49.67 447.1 64 433.6 64 415.1V96.03C64 78.36 49.67 64.03 31.1 64.03zM267.5 71.41l-192 159.1C67.82 237.8 64 246.9 64 256c0 9.094 3.82 18.18 11.44 24.62l192 159.1c20.63 17.12 52.51 2.75 52.51-24.62v-319.9C319.1 68.66 288.1 54.28 267.5 71.41z" />
                        </svg>
                    </button>
                    {isPlaying ? <button className="btn player-btn mx-2" type="button" onClick={playPause} style={playingStyle}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor">
                            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM224 191.1v128C224 337.7 209.7 352 192 352S160 337.7 160 320V191.1C160 174.3 174.3 160 191.1 160S224 174.3 224 191.1zM352 191.1v128C352 337.7 337.7 352 320 352S288 337.7 288 320V191.1C288 174.3 302.3 160 319.1 160S352 174.3 352 191.1z" />
                        </svg></button> :
                        <button className="btn player-btn mx-2 text-white" type="button" onClick={playPause}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor">
                                <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM176 168V344C176 352.7 180.7 360.7 188.3 364.9C195.8 369.2 205.1 369 212.5 364.5L356.5 276.5C363.6 272.1 368 264.4 368 256C368 247.6 363.6 239.9 356.5 235.5L212.5 147.5C205.1 142.1 195.8 142.8 188.3 147.1C180.7 151.3 176 159.3 176 168V168z" />
                            </svg>
                        </button>
                    }
                    
                    {/* <button className="btn player-btn mx-2 text-white" type="button" onClick={playPause}>
                        {isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor">
                            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM224 191.1v128C224 337.7 209.7 352 192 352S160 337.7 160 320V191.1C160 174.3 174.3 160 191.1 160S224 174.3 224 191.1zM352 191.1v128C352 337.7 337.7 352 320 352S288 337.7 288 320V191.1C288 174.3 302.3 160 319.1 160S352 174.3 352 191.1z" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor">
                            <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM176 168V344C176 352.7 180.7 360.7 188.3 364.9C195.8 369.2 205.1 369 212.5 364.5L356.5 276.5C363.6 272.1 368 264.4 368 256C368 247.6 363.6 239.9 356.5 235.5L212.5 147.5C205.1 142.1 195.8 142.8 188.3 147.1C180.7 151.3 176 159.3 176 168V168z" />
                        </svg>}
                    </button> */}
                    <button className="btn forward-btn" type="button" onClick={skiptoNext}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-96 0 512 512" width="1em" height="1em" fill="currentColor">
                        {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
                            <path d="M287.1 447.1c17.67 0 31.1-14.33 31.1-32V96.03c0-17.67-14.33-32-32-32c-17.67 0-31.1 14.33-31.1 31.1v319.9C255.1 433.6 270.3 447.1 287.1 447.1zM52.51 440.6l192-159.1c7.625-6.436 11.43-15.53 11.43-24.62c0-9.094-3.809-18.18-11.43-24.62l-192-159.1C31.88 54.28 0 68.66 0 96.03v319.9C0 443.3 31.88 457.7 52.51 440.6z" />
                        </svg>
                    </button>
                </div>
                <div className="py-0 mt-0 d-flex justify-content-center align-items-center">
                    {/* <input type="range" className="slider my-0" min={0} max={calculateTime(duration)} value={seekValue} name="duration-slider" onChange={(e) =>{
                        console.log(calculateTime(duration))
                        audioElem.current.currentTime = e.target.value;
                        setSeekValue(e.target.value/duration * 100/100);
                        // console.log(seekValue);
                        }
                    } /> */}
                    <div className="navigation">
                        <div className="navigation_wrapper" ref={clickRef} onClick={checkWidth}>
                            <div className="seek_bar" style={{ width: `${currentSong.progress+"%"}`}}></div>
                        </div>
                    </div>
                    <span className="text_small ms-2">2:16</span>
                </div>
            </div>
        </div>
    )
}
