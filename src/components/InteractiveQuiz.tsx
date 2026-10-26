import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Clock, 
  BookOpen, 
  Check, 
  GraduationCap,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { QUIZ_QUESTIONS, Question } from '../data/quizData';

interface InteractiveQuizProps {
  onViewMatrix: () => void;
  onOpenSimulator: () => void;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ 
  onViewMatrix, 
  onOpenSimulator 
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [isSubmitted, setIsSubmitted] = useState<Record<number, boolean>>({});
  const [quizMode, setQuizMode] = useState<'practice' | 'exam'>('practice');
  const [examFinished, setExamFinished] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const currentQ: Question = QUIZ_QUESTIONS[currentIdx];
  const totalQuestions = QUIZ_QUESTIONS.length;

  // Timer for exam mode
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && !examFinished) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, examFinished]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionId: 'A' | 'B' | 'C' | 'D') => {
    if (quizMode === 'practice' && isSubmitted[currentQ.id]) return;
    if (examFinished) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId
    }));
  };

  const handleConfirmAnswer = () => {
    if (!selectedAnswers[currentQ.id]) return;
    setIsSubmitted((prev) => ({
      ...prev,
      [currentQ.id]: true
    }));
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleFinishExam = () => {
    // In exam mode, mark all as submitted
    const allSubmitted: Record<number, boolean> = {};
    QUIZ_QUESTIONS.forEach((q) => {
      allSubmitted[q.id] = true;
    });
    setIsSubmitted(allSubmitted);
    setExamFinished(true);
    setIsTimerActive(false);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted({});
    setCurrentIdx(0);
    setExamFinished(false);
    setSecondsElapsed(0);
    setIsTimerActive(true);
  };

  // Calculate score
  const correctCount = QUIZ_QUESTIONS.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctOptionId ? acc + 1 : acc;
  }, 0);

  const percentageScore = Math.round((correctCount / totalQuestions) * 100);

  // Check if current question is answered
  const isCurrentAnswered = !!selectedAnswers[currentQ.id];
  const isCurrentSubmitted = !!isSubmitted[currentQ.id];
  const showFeedback = (quizMode === 'practice' && isCurrentSubmitted) || examFinished;

  return (
    <div className="space-y-6">
      {/* Quiz Toolbar & Mode Switch */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
            <span>Sesión Día 1</span>
            <span aria-hidden="true">·</span>
            <span>Unidad 1: Competencias Digitales</span>
            <span aria-hidden="true">·</span>
            <span>UNEMI 2026</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Quiz de Alto Rendimiento Académico: Redes y Telecomunicaciones
          </h2>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Practice vs Exam Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => {
                setQuizMode('practice');
                setExamFinished(false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                quizMode === 'practice'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Modo Práctica (Feedback Inmediato)
            </button>
            <button
              onClick={() => {
                setQuizMode('exam');
                setExamFinished(false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                quizMode === 'exam'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Modo Examen Formal
            </button>
          </div>

          {/* Timer Display */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-medium text-slate-700 tabular-nums">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{formatTime(secondsElapsed)}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {!examFinished ? (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Stepper Navigation */}
          <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Reactivo {currentIdx + 1} de {totalQuestions}
              </span>
              <span aria-hidden="true" className="text-slate-300">|</span>
              <span className="text-xs font-medium text-sky-800">
                {currentQ.topic}
              </span>
            </div>

            {/* Stepper bubbles */}
            <div className="flex items-center gap-1.5">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const isAnswered = !!selectedAnswers[q.id];
                const isSelected = currentIdx === idx;
                const isCorrect = selectedAnswers[q.id] === q.correctOptionId;
                const submitted = !!isSubmitted[q.id];

                let bubbleClass = 'bg-white border-slate-300 text-slate-600 hover:border-slate-400';

                if (isSelected) {
                  bubbleClass = 'ring-2 ring-sky-600 bg-sky-600 text-white font-bold border-transparent';
                } else if (submitted && quizMode === 'practice') {
                  bubbleClass = isCorrect
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-800 font-bold'
                    : 'bg-rose-100 border-rose-300 text-rose-800 font-bold';
                } else if (isAnswered) {
                  bubbleClass = 'bg-slate-200 border-slate-300 text-slate-800 font-semibold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-7 h-7 rounded-md border text-xs flex items-center justify-center transition-all ${bubbleClass}`}
                    title={`Ir al reactivo ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Real World Scenario Box */}
            <div className="bg-gradient-to-r from-sky-50/70 via-slate-50 to-white border border-sky-100 rounded-xl p-4 sm:p-5 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-sky-900 uppercase tracking-wider">
                  Situación Técnica Real / Entorno Universitario:
                </span>
                <span className="text-[11px] text-slate-500">
                  {currentQ.reference}
                </span>
              </div>
              <p className="text-sm text-slate-800 leading-relaxed font-normal">
                {currentQ.scenario}
              </p>
            </div>

            {/* Question Statement */}
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentQ.statement}
              </h3>
            </div>

            {/* 4 Options Selection */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((opt) => {
                const isSelected = selectedAnswers[currentQ.id] === opt.id;
                const isCorrect = opt.id === currentQ.correctOptionId;

                let optCardStyle = 'bg-white border-slate-200 hover:border-sky-300 hover:bg-slate-50/50 text-slate-800';

                if (showFeedback) {
                  if (isCorrect) {
                    optCardStyle = 'bg-emerald-50/80 border-emerald-400 text-emerald-950 ring-1 ring-emerald-400';
                  } else if (isSelected && !isCorrect) {
                    optCardStyle = 'bg-rose-50/80 border-rose-300 text-rose-950 ring-1 ring-rose-300';
                  } else {
                    optCardStyle = 'bg-slate-50/60 border-slate-200 text-slate-500 opacity-70';
                  }
                } else if (isSelected) {
                  optCardStyle = 'bg-sky-50/80 border-sky-500 text-sky-950 ring-2 ring-sky-500 shadow-xs';
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={showFeedback && quizMode === 'practice'}
                    className={`w-full p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all cursor-pointer disabled:cursor-default ${optCardStyle}`}
                  >
                    <div className={`w-6 h-6 rounded-md font-mono text-xs font-bold shrink-0 flex items-center justify-center transition-colors ${
                      showFeedback
                        ? isCorrect
                          ? 'bg-emerald-600 text-white'
                          : isSelected
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                        : isSelected
                        ? 'bg-sky-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {opt.id}
                    </div>

                    <div className="flex-1 text-sm leading-relaxed">
                      {opt.text}
                    </div>

                    {showFeedback && (
                      <div className="shrink-0 self-center">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : isSelected ? (
                          <XCircle className="w-5 h-5 text-rose-600" />
                        ) : null}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Immediate Pedagogical Feedback (Practice Mode) */}
            {showFeedback && (
              <div className="mb-8 rounded-xl border p-5 bg-sky-50/40 border-sky-200 animate-fadeIn">
                <div className="flex items-center gap-2 mb-2 text-sky-900 font-bold text-sm">
                  <BookOpen className="w-4 h-4 text-sky-700" />
                  <span>Justificación Pedagógica del Comité Académico:</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {currentQ.pedagogicalFeedback}
                </p>

                {/* Technical Distractor Review */}
                <div className="mt-4 pt-3 border-t border-sky-200/70">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-2">
                    Análisis Técnico de los Distractores:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600">
                    {currentQ.options.map((opt) => (
                      <div key={opt.id} className="p-2 rounded bg-white/70 border border-slate-200">
                        <strong className="font-mono text-slate-800">{opt.id}:</strong> {opt.distractorAnalysis}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Action Footer */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handlePrev}
                  disabled={currentIdx === 0}
                  className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentIdx === totalQuestions - 1}
                  className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                {quizMode === 'practice' && !isCurrentSubmitted && (
                  <button
                    onClick={handleConfirmAnswer}
                    disabled={!isCurrentAnswered}
                    className="w-full sm:w-auto px-5 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
                  >
                    Confirmar Respuesta
                  </button>
                )}

                {quizMode === 'exam' && (
                  <button
                    onClick={handleFinishExam}
                    disabled={Object.keys(selectedAnswers).length === 0}
                    className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
                  >
                    Finalizar Evaluación ({Object.keys(selectedAnswers).length}/{totalQuestions})
                  </button>
                )}

                {quizMode === 'practice' && isCurrentSubmitted && currentIdx === totalQuestions - 1 && (
                  <button
                    onClick={() => setExamFinished(true)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
                  >
                    Ver Resultados Finales
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Exam Results Screen */
        <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="text-center max-w-xl mx-auto pb-8 border-b border-slate-200">
            <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-3 shadow-2xs">
              <GraduationCap className="w-7 h-7" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Dictamen de Evaluación: Día 1
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Comité Académico de Pensamiento Computacional y Tecnologías de la Información
            </p>

            {/* Score Ring / Metric */}
            <div className="mt-6 inline-flex flex-col items-center p-4 rounded-xl bg-slate-50 border border-slate-200 min-w-[220px]">
              <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                {correctCount} / {totalQuestions}
              </span>
              <span className="text-xs font-bold text-sky-700 mt-1">
                Calificación: {percentageScore}% / 100%
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                Tiempo de resolución: {formatTime(secondsElapsed)}
              </span>
            </div>

            <div className="mt-4">
              {percentageScore >= 80 ? (
                <div className="p-3 bg-emerald-50 text-emerald-900 rounded-lg border border-emerald-200 text-xs font-medium">
                  <strong>Nivel Superior Aprobado:</strong> Dominas cabalmente la división en paquetes, las capas TCP/IP, la frontera LAN/WAN y el rol técnico de los ISPs ecuatorianos.
                </div>
              ) : (
                <div className="p-3 bg-amber-50 text-amber-900 rounded-lg border border-amber-200 text-xs font-medium">
                  <strong>Oportunidad de Refuerzo:</strong> Te sugerimos repasar la analogía del servicio postal, la función del router como guardia de tránsito y consultar el Compendio UNEMI Unidad 1.
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleResetQuiz}
                className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reintentar Quiz</span>
              </button>
              <button
                onClick={onOpenSimulator}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors border border-slate-200"
              >
                <span>Explorar en el Simulador</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onViewMatrix}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Ver Matriz Curricular Completa</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="mt-8 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Desglose y Justificación por Reactivo:
            </h3>

            {QUIZ_QUESTIONS.map((q) => {
              const selectedOpt = selectedAnswers[q.id];
              const isCorrect = selectedOpt === q.correctOptionId;
              return (
                <div 
                  key={q.id}
                  className={`p-4 rounded-xl border text-xs ${
                    isCorrect
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                      : 'bg-rose-50/40 border-rose-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-slate-900">
                      Reactivo {q.id}: {q.topic}
                    </span>
                    <span className={`font-bold font-mono px-2 py-0.5 rounded text-[11px] ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {isCorrect ? 'Correcta' : 'Incorrecta'} (Tu respuesta: {selectedOpt || 'Sin responder'} · Correcta: {q.correctOptionId})
                    </span>
                  </div>

                  <p className="font-medium text-slate-800 mb-2">
                    {q.statement}
                  </p>

                  <div className="p-2.5 rounded bg-white border border-slate-200 text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">Fundamento Pedagógico:</strong> {q.pedagogicalFeedback}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
