import { useEffect, useRef, useState } from 'react';
import BookButton from './BookButton';
import { INDUS_QUIZ } from '@/data/indusQuiz';

const IndusQuiz = () => {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const question = INDUS_QUIZ[step];

  useEffect(() => {
    if (step > 0) headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const chooseAnswer = (option: string) => {
    if (answer !== null || !question) return;
    setAnswer(option);
    if (option === question.correctAnswer) setScore((value) => value + 1);
  };

  return (
    <section className="bg-stonepage band-section" aria-labelledby="indus-quiz-heading">
      <div className="max-w-6xl mx-auto">
        <h2 id="indus-quiz-heading" className="page-heading max-w-3xl">
          How much do you know about the Indus script?
        </h2>
        <div className="max-w-3xl border-t-4 border-lapis pt-6">
          {question ? (
            <>
              <p className="text-lapis/80 mb-3">Question {step + 1} of {INDUS_QUIZ.length}</p>
              <h3 ref={headingRef} tabIndex={-1} className="font-serif text-2xl text-lapis mb-6">
                {question.question}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3" role="group" aria-label={question.question}>
                {question.options.map((option) => (
                  <BookButton
                    key={option}
                    variant="outline"
                    className="w-full justify-start text-left px-4"
                    onClick={() => chooseAnswer(option)}
                    aria-pressed={answer === option}
                    disabled={answer !== null}
                  >
                    {option}
                  </BookButton>
                ))}
              </div>
              <div role="status" aria-live="polite" aria-atomic="true" className="mt-6">
                {answer !== null && (
                  <>
                    <p className="font-semibold mb-2">
                      {answer === question.correctAnswer ? 'Correct.' : `Not quite. The answer is: ${question.correctAnswer}.`}
                    </p>
                    <p className="text-lapis/90 leading-relaxed">{question.feedback}</p>
                  </>
                )}
              </div>
              {answer !== null && (
                <BookButton className="mt-6" onClick={() => { setStep((value) => value + 1); setAnswer(null); }}>
                  {step === INDUS_QUIZ.length - 1 ? 'See your score' : 'Next question'}
                </BookButton>
              )}
            </>
          ) : (
            <>
              <h3 ref={headingRef} tabIndex={-1} className="font-serif text-2xl text-lapis mb-6">
                Your score: {score} out of {INDUS_QUIZ.length}
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <BookButton variant="outline" href="/Raghav-Kartikeya-Sample-Chapters.pdf" target="_blank" rel="noopener noreferrer">
                  Read the first two chapters free
                </BookButton>
                <BookButton href="#buy">Order a signed copy</BookButton>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default IndusQuiz;