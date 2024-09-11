import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function NotFoundPage() {
    
    const [characterPosition, setCharacterPosition] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [score, setScore] = useState(0);

    
    const jump = () => {
        if (!isJumping) {
            setIsJumping(true);
            setCharacterPosition(50);
            setTimeout(() => {
                setCharacterPosition(0); 
                setIsJumping(false);
                setScore((prevScore) => prevScore + 1);
            }, 500); 
        }
    };
    useEffect(() => {
        const obstacleMovement = setInterval(() => {
            const obstacle = document.querySelector(".obstacle");
            const character = document.querySelector(".character");

            const characterBottom = parseInt(
                window.getComputedStyle(character).getPropertyValue("bottom")
            );
            const obstacleLeft = parseInt(
                window.getComputedStyle(obstacle).getPropertyValue("left")
            );

            if (obstacleLeft > 0 && obstacleLeft < 50 && characterBottom <= 20) {
                clearInterval(obstacleMovement);
                alert(`Game Over! Your score: ${score}`);
                setScore(0); 
            }
        }, 50);

        return () => clearInterval(obstacleMovement);
    }, [score]);

    return (
        <div className="not-found">
            <h1>404 - Page Not Found</h1>
            <p>Oops! Looks like the page you’re looking for doesn’t exist.</p>
            <Link to="/"> Home</Link>
            
            <div className="game-container">
                <div
                    className="character"
                    style={{ bottom: `${characterPosition}px` }}
                    onClick={jump}
                    >
                    {"✈️"}
                </div>
                <div className="obstacle">🚌</div>
            </div>

            <p className="score">Score: {score}</p>
            <p>Click the character to jump!</p>
        </div>
    );
}

export default NotFoundPage;
