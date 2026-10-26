import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Printer, 
  BookOpen, 
  Award,
  Layers,
  Search
} from 'lucide-react';
import { QUIZ_QUESTIONS, QUIZ_TOPICS } from '../data/quizData';

export const AcademicMatrix: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuestions = QUIZ_QUESTIONS.filter((q) => {
    const matchesTopic = selectedTopicFilter === 'all' || q.topicKey === selectedTopicFilter;
    const matchesSearch = 
      q.statement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.scenario.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  const generateFullTextExam = () => {
    let text = `UNIVERSIDAD ESTATAL DE MILAGRO (UNEMI)\n`;
    text += `FACULTAD DE CIENCIAS E INGENIERÍA - PROYECTO DE VINCULACIÓN\n`;
    text += `ASIGNATURA: PENSAMIENTO COMPUTACIONAL\n`;
    text += `EVALUACIÓN ACADÉMICA - SESIÓN DÍA 1: EL VIAJE INVISIBLE DE LOS DATOS Y EL ENTORNO DIGITAL\n`;
    text += `Comité Académico Experto en Pensamiento Computacional y TI\n`;
    text += `=================================================================================\n\n`;

    QUIZ_QUESTIONS.forEach((q, idx) => {
      text += `REACTIVO ${idx + 1} [Tema: ${q.topic}] (Nivel Bloom: ${q.bloomLevel})\n`;
      text += `Referencia Académica: ${q.reference}\n`;
      text += `Competencia Evaluada: ${q.competency}\n\n`;
      text += `Situación / Escenario Técnico:\n"${q.scenario}"\n\n`;
      text += `Enunciado:\n${q.statement}\n\n`;
      text += `Opciones de Respuesta:\n`;
      q.options.forEach((opt) => {
        text += `  ${opt.id}) ${opt.text}\n`;
      });
      text += `\n>> RESPUESTA CORRECTA: ${q.correctOptionId}\n`;
      text += `>> JUSTIFICACIÓN PEDAGÓGICA Y TÉCNICA:\n${q.pedagogicalFeedback}\n`;
      text += `---------------------------------------------------------------------------------\n\n`;
    });

    return text;
  };

  const handleCopyExam = () => {
    const content = generateFullTextExam();
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner for Academic Quality */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-800 uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Universidad Estatal de Milagro · Comité Académico de Pensamiento Computacional</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Matriz Curricular y Justificación Pedagógica de Reactivos (Día 1)
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl">
              Instrumento de evaluación formativa y sumativa con diseño basado en evidencia técnica según el Compendio de Pensamiento Computacional UNEMI (Tanenbaum & Wetherall, 2011; Forouzan, 2007).
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyExam}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">¡Copiado al Portapapeles!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  <span>Copiar Reactivos para LMS</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-2xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Exportar PDF</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="pt-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold text-slate-500 mr-1 shrink-0">Filtrar por Tema:</span>
            <button
              onClick={() => setSelectedTopicFilter('all')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedTopicFilter === 'all'
                  ? 'bg-sky-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todos (5)
            </button>
            {QUIZ_TOPICS.map((topic) => (
              <button
                key={topic.key}
                onClick={() => setSelectedTopicFilter(topic.key)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  selectedTopicFilter === topic.key
                    ? 'bg-sky-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {topic.name}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar en reactivos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      {/* Questions Matrix Cards */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => (
          <div 
            key={q.id}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs hover:border-slate-300 transition-colors"
          >
            {/* Metadata Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                  REACTIVO 0{q.id}
                </span>
                <span className="text-xs font-semibold text-slate-900">
                  {q.topic}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Nivel Bloom: <strong className="text-slate-700">{q.bloomLevel}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Clave: <strong className="text-emerald-700 font-bold font-mono">Opción {q.correctOptionId}</strong></span>
              </div>
            </div>

            {/* Scenario Box */}
            <div className="mb-4 bg-slate-50 rounded-lg p-3.5 border border-slate-200/80">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Contextualización / Situación Real:
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "{q.scenario}"
              </p>
            </div>

            {/* Enunciado */}
            <div className="mb-4">
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {q.statement}
              </h3>
            </div>

            {/* Opciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-5">
              {q.options.map((opt) => {
                const isCorrect = opt.id === q.correctOptionId;
                return (
                  <div
                    key={opt.id}
                    className={`p-3 rounded-lg border text-xs flex flex-col justify-between ${
                      isCorrect
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className={`font-mono font-bold text-xs shrink-0 w-5 h-5 rounded flex items-center justify-center ${
                        isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {opt.id}
                      </span>
                      <span className="leading-relaxed">{opt.text}</span>
                    </div>

                    {opt.distractorAnalysis && (
                      <div className="mt-2 pt-1.5 border-t border-slate-100 text-[11px] text-slate-500">
                        <strong className="text-slate-600">Análisis:</strong> {opt.distractorAnalysis}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pedagogical Feedback */}
            <div className="bg-sky-50/50 rounded-lg p-3.5 border border-sky-100 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-sky-900 mb-1">
                <BookOpen className="w-3.5 h-3.5 text-sky-700" />
                <span>Justificación Pedagógica y Fundamento Bibliográfico:</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {q.pedagogicalFeedback}
              </p>
              <div className="mt-2 text-[11px] text-sky-800 font-medium">
                Fuente académica: <span className="italic">{q.reference}</span>
              </div>
            </div>
          </div>
        ))}

        {filteredQuestions.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            <Layers className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="text-sm">No se encontraron reactivos con el filtro aplicado.</p>
          </div>
        )}
      </div>
    </div>
  );
};
