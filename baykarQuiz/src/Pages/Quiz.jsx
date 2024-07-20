import React, { useEffect, useState } from 'react';
import { fetchQuizData } from '../components/utils.js';
import ProgressBar from "../components/ProgresBar.jsx";

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showNextButton, setShowNextButton] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        async function fetchQuestions() {
            const quizQuestions = await fetchQuizData();
            setQuestions(quizQuestions);
        }
        fetchQuestions();
    }, []);

    useEffect(() => {
        let timer;
        if (timeLeft > 0 && timeLeft <= 30) {
            timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleNextQuestion();
        }
        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleAnswerClick = (choice) => {
        setSelectedAnswer(choice);
        setShowNextButton(true);
    };

    const handleNextQuestion = () => {
        setAnswers([...answers, { question: questions[currentQuestionIndex].question, answer: selectedAnswer }]);
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer('');
            setShowNextButton(false);
            setTimeLeft(30);
        } else {

            setShowResults(true);
        }
    };

    const [showResults, setShowResults] = useState(false);

    return (
        <div className="container w-1/2  mx-auto mt-16">
            {showResults ? (
                <div className="p-4 shadow-lg rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Sonuçlar</h2>
                    <ul className="space-y-2">
                        {answers.map((answer, index) => (
                            <li key={index} className="p-2 bg-gray-200 rounded-md">
                                <strong>{index + 1}. Soru:</strong> {answer.question}
                                <br />
                                <strong>Cevap:</strong> {answer.answer}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="p-4 shadow-lg rounded-lg">
                    {questions.length > 0 && (
                        <>
                            <h2 className="text-xl font-bold mb-4">{questions[currentQuestionIndex].question}</h2>
                            <ul className="space-y-2">
                                {questions[currentQuestionIndex].choices.map((choice, index) => (
                                    <button
                                        disabled={timeLeft > 20}
                                        key={index}
                                        className={`p-2 rounded-md w-full disabled:bg-red-700 cursor-pointer flex flex-col gap-y-4 ${
                                            selectedAnswer === choice ? 'bg-gray-800' : 'bg-gray-400'
                                        }`}
                                        onClick={() => handleAnswerClick(choice)}
                                    >
                                        {choice}
                                    </button>
                                ))}
                            </ul>
                            <div className="flex justify-between items-center mt-4">
                                <div>
                                    {timeLeft > 0 && (
                                        <p className="text-sm">Kalan Süre: {timeLeft} saniye</p>
                                    )}
                                </div>
                                {showNextButton && (
                                    <button
                                        onClick={handleNextQuestion}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer"
                                    >
                                        Sonraki Soru
                                    </button>
                                )}
                            </div>
                            <ProgressBar timeLeft={timeLeft} handleNextQuestion={handleNextQuestion} />
                            {/* ProgressBar bileşenini ekledik */}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Quiz;
