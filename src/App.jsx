import { useEffect, useState } from "react";
import questions from "./questions";

export default function App() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[index];

  function handleAnswer(choice) {
    setSelected(choice);

    if (choice === current.answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (index + 1 < questions.length) {
        setIndex(index + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 500);
  }

  function restart() {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }
  
  return (
    <div className="app">
      <h1>React Quiz App</h1>

      {finished ? (
        <div className="result">
          <h2>Your Score: {score} / {questions.length}</h2>
          <button onClick={restart}>Restart</button>
        </div>
      ) : (
        <div className="quiz">
          <h2>{current.question}</h2> 

          <div className="choices">
            {current.choices.map((c, i) => (
              <button
                key={i}
                className={
                  selected === c
                    ? c === current.answer
                      ? "btn correct"
                      : "btn wrong"
                    : "btn"
                }
                disabled={selected !== null}
                onClick={() => handleAnswer(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <p>Question {index + 1} / {questions.length}</p>
        </div>
      )}
    </div>
  );
}
