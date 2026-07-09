import React, { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

function Quiz({ lessonId, quiz, onPassed }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOption === null) return;
    setSubmitted(true);
    if (selectedOption === quiz.correctIndex) {
      onPassed();
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setSubmitted(false);
  };

  const isCorrect = selectedOption === quiz.correctIndex;

  return (
    <div className="space-y-4">
      <div className="text-base font-bold text-slate-800 dark:text-slate-200">
        {quiz.question}
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        {quiz.options.map((option, idx) => {
          let optionStyle = "border-slate-200 dark:border-slate-800 hover:border-indigo-400 bg-white dark:bg-slate-950";
          if (selectedOption === idx) {
            optionStyle = "border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400";
          }
          if (submitted) {
            if (idx === quiz.correctIndex) {
              optionStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold";
            } else if (selectedOption === idx) {
              optionStyle = "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400";
            }
          }

          return (
            <label
              key={idx}
              className={`flex items-center gap-3 p-3.5 border rounded-xl cursor-pointer transition text-sm ${optionStyle}`}
            >
              <input
                type="radio"
                name={`quiz-${lessonId}`}
                value={idx}
                checked={selectedOption === idx}
                onChange={() => !submitted && setSelectedOption(idx)}
                disabled={submitted}
                className="sr-only"
              />
              <span className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                {String.fromCharCode(65 + idx)}
              </span>
              <span>{option}</span>
            </label>
          );
        })}

        {!submitted ? (
          <button
            type="submit"
            disabled={selectedOption === null}
            className={`w-full py-3 rounded-xl font-bold text-sm mt-3 transition ${selectedOption !== null ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}`}
          >
            Submit Answer
          </button>
        ) : (
          <div className="pt-2 space-y-3">
            <div className={`p-4 rounded-xl flex items-start gap-2.5 text-sm ${isCorrect ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-800 dark:text-rose-400'}`}>
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-extrabold">{isCorrect ? 'Correct!' : 'Incorrect'}</div>
                <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">{quiz.explanation}</div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-indigo-500 font-bold hover:underline"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Try Quiz Again
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Quiz;
