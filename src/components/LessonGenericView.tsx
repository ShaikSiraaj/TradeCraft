import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { LessonData } from '../data/lessonsData';

interface LessonGenericViewProps {
  lesson: LessonData;
  onPrev: () => void;
  onNext: () => void;
  onLessonComplete: (lessonId: string) => void;
  isCompleted: boolean;
}

export default function LessonGenericView({
  lesson,
  onPrev,
  onNext,
  onLessonComplete,
  isCompleted
}: LessonGenericViewProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // Reset quiz states when moving to a different lesson
  useEffect(() => {
    setSelectedAnswer(null);
    setIsQuizSubmitted(false);
    setIsCorrect(false);
  }, [lesson.id]);

  const handleQuizSubmit = () => {
    if (selectedAnswer === null) return;
    const correct = selectedAnswer === lesson.quiz.correctIndex;
    setIsCorrect(correct);
    setIsQuizSubmitted(true);
    if (correct) {
      onLessonComplete(lesson.id);
    }
  };

  const handleMarkAsComplete = () => {
    onLessonComplete(lesson.id);
  };

  return (
    <div id={`lesson-${lesson.number}-view-root`} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in pb-16">

      {/* Left/Main Column (9 spans on desktop) */}
      <div className="lg:col-span-9 space-y-8">

        {/* Lesson Breadcrumbs & Header */}
        <header className="space-y-4">
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 rounded-lg font-headline text-xs font-bold uppercase tracking-wider">
            Lesson {lesson.number} • {lesson.moduleName}
          </span>
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-market-navy">
            {lesson.title}
          </h1>
          <p className="font-sans text-base md:text-lg text-slate-400 max-w-3xl leading-relaxed">
            {lesson.summary}
          </p>
        </header>

        {/* Lesson Core Body Content */}
        <section className="bg-white border border-surface-border rounded-xl p-6 md:p-8 space-y-6">
          <div
            className="prose prose-invert max-w-none space-y-5"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />

          {/* Quick Mark as Complete action */}
          <div className="pt-6 border-t border-slate-100/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
            <div className="space-y-1">
              <h4 className="font-headline text-sm font-bold text-market-navy">Ready to lock in progress?</h4>
              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                Confirm your conceptual understanding or submit the quiz below to mark this lesson as completed!
              </p>
            </div>
            <button
              onClick={handleMarkAsComplete}
              className={`font-headline text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 shrink-0 ${
                isCompleted
                  ? 'bg-slate-100 text-slate-500 cursor-default'
                  : 'bg-growth-green hover:bg-opacity-95 text-white shadow active:scale-95'
              }`}
            >
              {isCompleted ? 'Lesson Completed ✓' : 'Mark Completed'}
              {isCompleted && <Check className="w-4 h-4 text-growth-green" />}
            </button>
          </div>
        </section>

        {/* Interactive Quick Quiz Section */}
        {lesson.quiz.question && (
          <section className="bg-white border border-surface-border rounded-xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-accent-blue" />
              <h3 className="font-headline text-xl font-bold text-market-navy">Lesson Checkpoint: Quick Quiz</h3>
            </div>

            <div className="space-y-4">
              <p className="font-sans text-sm md:text-base text-slate-300 font-semibold leading-relaxed">
                {lesson.quiz.question}
              </p>

              <div className="space-y-2.5">
                {lesson.quiz.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={isQuizSubmitted && isCorrect}
                    onClick={() => setSelectedAnswer(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      selectedAnswer === idx
                        ? 'border-accent-blue bg-blue-50/10 text-market-navy font-bold'
                        : 'border-slate-800 hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <span>{option}</span>
                    {selectedAnswer === idx && (
                      <div className="w-4 h-4 rounded-full bg-accent-blue flex items-center justify-center text-white flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Submit and Feedback Panel */}
              <div className="pt-2">
                {(!isQuizSubmitted || !isCorrect) ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={selectedAnswer === null}
                    className={`font-headline text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-lg transition-all cursor-pointer ${
                      selectedAnswer !== null
                        ? 'bg-market-navy hover:bg-opacity-95 text-white active:scale-95'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Answer
                  </button>
                ) : null}

                {isQuizSubmitted && (
                  <div className={`p-4 rounded-xl flex items-start gap-3 border mt-4 ${
                    isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}>
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1 flex-1">
                      <p className="font-headline text-sm font-bold">
                        {isCorrect ? "Correct! Amazing work." : "Incorrect Answer"}
                      </p>
                      <p className="font-sans text-xs text-slate-400 leading-relaxed">
                        {isCorrect ? lesson.quiz.explanation : "Please try again! Review the core principles in this lesson to find the correct answer."}
                      </p>
                      {!isCorrect && (
                        <button
                          onClick={() => {
                            setSelectedAnswer(null);
                            setIsQuizSubmitted(false);
                          }}
                          className="font-headline text-xs font-bold text-rose-400 hover:underline pt-1.5 block cursor-pointer"
                        >
                          Try Again
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Screen Navigation */}
        <div className="flex justify-between items-center py-8 border-t border-slate-800">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 px-5 py-3 border border-slate-700 text-slate-300 font-headline text-xs font-bold uppercase tracking-wider hover:bg-slate-800/40 transition-all rounded-lg cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-3 bg-growth-green hover:bg-opacity-95 text-white font-headline text-xs font-bold uppercase tracking-wider shadow-md transition-all rounded-lg cursor-pointer active:scale-95"
          >
            Next Lesson
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Right Sidebar Column (3 spans on desktop) */}
      <div className="lg:col-span-3 space-y-6">

        {/* Progress summary for this lesson */}
        <div className="bg-white border border-surface-border rounded-xl p-5 space-y-4 shadow-sm">
          <h4 className="font-headline text-xs font-bold text-slate-400 uppercase tracking-wider">In This Lesson</h4>
          <ul className="space-y-3 font-sans text-sm text-slate-300">
            <li className="flex items-center gap-2 text-growth-green font-semibold">
              <Check className="w-4 h-4" />
              <span>Syllabus Reading</span>
            </li>
            <li className="flex items-center gap-2 text-growth-green font-semibold">
              <Check className="w-4 h-4" />
              <span>Core Terminology</span>
            </li>
            <li className={`flex items-center gap-2 ${isCompleted ? 'text-growth-green font-semibold' : 'text-slate-500'}`}>
              {isCompleted ? <Check className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border border-slate-700"></div>}
              <span>Interactive Quiz</span>
            </li>
          </ul>
        </div>

        {/* Custom Tip Box */}
        {lesson.tip && (
          <div className="bg-sky-500/5 border-l-4 border-accent-blue p-5 rounded-r-xl space-y-2">
            <h4 className="font-headline text-xs font-bold text-accent-blue uppercase tracking-wider">Academy Tip</h4>
            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              "{lesson.tip}"
            </p>
          </div>
        )}

        {/* Key Vocabulary Terms */}
        {lesson.sidebarKeyTerms.length > 0 && (
          <div className="bg-white border border-surface-border rounded-xl p-5 space-y-4 shadow-sm">
            <h3 className="font-headline text-xs font-bold text-market-navy uppercase tracking-wider border-b border-slate-800 pb-2">
              Key Vocabulary
            </h3>
            <div className="space-y-4">
              {lesson.sidebarKeyTerms.map((item, idx) => (
                <div key={idx}>
                  <h4 className="font-headline text-xs font-bold text-market-navy">{item.term}</h4>
                  <p className="font-sans text-xs text-slate-400 mt-1 leading-relaxed">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Beautiful Image Context Box */}
        {lesson.imageUrl && (
          <div className="rounded-xl overflow-hidden border border-surface-border bg-white shadow-sm group">
            <div className="h-44 relative overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={lesson.imageUrl}
                alt={lesson.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-market-navy/85 via-market-navy/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white space-y-0.5">
                <p className="font-headline text-[9px] uppercase tracking-wider font-bold text-sky-200">The Academy</p>
                <p className="font-headline text-sm font-bold leading-tight">{lesson.title}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
