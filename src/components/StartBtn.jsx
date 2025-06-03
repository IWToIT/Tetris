import React, { useEffect, useRef } from 'react'
import useSound from "use-sound";
import gameSound from "../assets/music-for-puzzle-game-146738.mp3";


function StartBtn({ isPlaying, musicPlaying, dispatch }) {
  const timeoutRef = useRef(null);

  const [play, { stop }] = useSound(gameSound, {
      volume: 0.2,
      loop: true,
    });

  useEffect(() => {
    if (musicPlaying) {
      play();
    } else {
      stop();
    }
  }, [musicPlaying, play, stop]);

  const handleClick = () => {
    if (!isPlaying) {
      dispatch({ type: "start-game" });
      timeoutRef.current = setTimeout(() => {
        dispatch({ type: "play-music" });
      }, 500);
    } else {
      dispatch({ type: "stop-game" });
      dispatch({ type: "stop-music" });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      stop();
    };
  }, [stop]);

  return (
    <button className="start-btn" onClick={handleClick}>{isPlaying ? "Stop Game" : "Start Game"}</button>
  )
}

export default StartBtn