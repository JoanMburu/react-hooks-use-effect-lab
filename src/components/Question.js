import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Decrease the time remaining by 1 every second
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup function to clear the timer when component unmounts or when time hits 0
    return () => clearTimeout(timer);
  }, [timeRemaining]); // Add timeRemaining as a dependency to re-run the effect when it changes

  useEffect(() => {
    // If time runs out, reset timeRemaining and call onAnswered with false
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]); // Add onAnswered as a dependency to re-run the effect when it changes

  function handleAnswer(isCorrect) {
    // Reset the timer when an answer is chosen
    setTimeRemaining(10);
    // Call the onAnswered callback with the correctness of the answer
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
