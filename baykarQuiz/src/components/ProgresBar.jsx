import React, { useEffect } from 'react';

const ProgressBar = ({ timeLeft, handleNextQuestion }) => {
    useEffect(() => {
        let timer;
        if (timeLeft > 0 && timeLeft <= 30) {
            timer = setTimeout(() => {
                handleNextQuestion();
            }, timeLeft * 1000);
        } else if (timeLeft === 0) {
            handleNextQuestion();
        }
        return () => clearTimeout(timer);
    }, [timeLeft, handleNextQuestion]);

    return (
        <div className="w-full h-2 bg-gray-300 rounded-md overflow-hidden">
            <div
                className={`h-full ${
                    timeLeft > 20
                        ? 'bg-green-500'
                        : timeLeft > 10
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                }`}
                style={{ width: `${(timeLeft / 30) * 100}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
