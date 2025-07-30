import { useEffect, useState } from "react";
import axios from "axios";

export default function QuizPage() {
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState("");
  const [examStarted, setExamStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  const subjects = ["Maths", "Physics", "Chemistry", "Biology", "Geography"];

  // Timer Effect with 2-second delay for "Time up!" message
  useEffect(() => {
    if (!examStarted || finished) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t === 1) {
          setShowFeedback("⏰ Time up!");
          clearInterval(timer); // pause countdown

          setTimeout(() => {
            setShowFeedback("");
            if (current + 1 === questions.length) {
              setFinished(true);
              setExamStarted(false);
            } else {
              setCurrent((c) => c + 1);
              setTimeLeft(10);
            }
          }, 2000); // show "Time up!" for 2 seconds

          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, finished, current, questions.length]);

  const startExam = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/questions/${subject}`
      );
      setQuestions(res.data);
      setExamStarted(true);
      setCurrent(0);
      setScore(0);
      setFinished(false);
      setShowFeedback("");
      setTimeLeft(10);
    } catch (err) {
      alert("Failed to load questions.");
    }
  };

  const handleAnswer = (opt) => {
    if (!examStarted || finished) return;

    const correct = questions[current].correctAnswer;
    setSelectedOption(opt);

    if (opt === correct) {
      setScore((s) => s + 1);
      setShowFeedback("✅ Correct!");
    } else {
      setShowFeedback(`❌ Wrong! Correct answer: ${correct}`);
    }

    setTimeout(() => {
      setSelectedOption(null);
      setShowFeedback("");
      if (current + 1 === questions.length) {
        setFinished(true);
        setExamStarted(false);
      } else {
        setCurrent((c) => c + 1);
        setTimeLeft(10);
      }
    }, 1000); // show feedback briefly before next question
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Quiz Page</h2>

      {/* Subject selection */}
      {!examStarted && !finished && (
        <>
          <label>Select Subject: </label>
          <select onChange={(e) => setSubject(e.target.value)} value={subject}>
            <option value="">--Choose--</option>
            {subjects.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
          <br />
          <br />
          <button onClick={startExam} disabled={!subject}>
            Start Exam
          </button>
        </>
      )}

      {/* Question display */}
      {examStarted && !finished && questions[current] && (
        <div>
          <h3>
            Question {current + 1}: {questions[current].question}
          </h3>
          <p className="time">
            <strong>Time left:</strong> {timeLeft}s
          </p>
          {questions[current].options.map((opt) => (
            <button
              key={opt}
              style={{
                margin: "5px",
                padding: "10px 15px",
                backgroundColor: selectedOption === opt ? "#ddd" : "#fff",
              }}
              onClick={() => handleAnswer(opt)}
              disabled={selectedOption !== null}
            >
              {opt}
            </button>
          ))}
          {showFeedback && (
            <p style={{ fontWeight: "bold", marginTop: "10px" }}>
              {showFeedback}
            </p>
          )}
        </div>
      )}

      {/* Final result */}
      {finished && (
        <div>
          <h2>🎉 Exam Complete!</h2>
          <p className="result">
            Your Score: {score} / {questions.length}
          </p>
          <button
            className="button1"
            onClick={() => {
              setExamStarted(false);
              setFinished(false);
              setSubject("");
              setQuestions([]);
              setCurrent(0);
            }}
          >
            Take Another Exam
          </button>
        </div>
      )}
    </div>
  );
}
