import React, { useState } from 'react';
import { 
  GraduationCap, 
  Layers, 
  Network, 
  FileSpreadsheet, 
  BookMarked, 
  ExternalLink,
  ShieldCheck,
  Cpu,
  Wifi,
  Globe2,
  Server
} from 'lucide-react';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { NetworkSimulator } from './components/NetworkSimulator';
import { AcademicMatrix } from './components/AcademicMatrix';

export default function App() {
  const [activeView, setActiveView] = useState<'quiz' | 'simulator' | 'matrix'>('quiz');
  const [showBiblioModal, setShowBiblioModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* 
        Top Bar Contract (Frontend Design Constitution):
        Zone 1: Single text element wordmark
        Zone 2: 4-5 single line nav links
        Zone 3: 1 primary action button
      */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-sky-900 text-white flex items-center justify-center font-bold shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setActiveView('quiz'); }}
              className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-sky-700 transition-colors"
            >
              Comité Académico UNEMI · TI
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveView('quiz')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeView === 'quiz' ? 'text-sky-700 font-semibold' : ''
              }`}
            >
              Quiz Interactivo (Día 1)
            </button>
            <button
              onClick={() => setActiveView('simulator')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeView === 'simulator' ? 'text-sky-700 font-semibold' : ''
              }`}
            >
              Simulador de Redes
            </button>
            <button
              onClick={() => setActiveView('matrix')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeView === 'matrix' ? 'text-sky-700 font-semibold' : ''
              }`}
            >
              Matriz Curricular y Claves
            </button>
            <button
              onClick={() => setShowBiblioModal(true)}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-slate-500"
            >
              Referencias Teóricas
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {activeView !== 'quiz' ? (
              <button
                onClick={() => setActiveView('quiz')}
                className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap shadow-xs"
              >
                Tomar Evaluación
              </button>
            ) : (
              <button
                onClick={() => setActiveView('matrix')}
                className="px-4 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap border border-slate-200"
              >
                Ver Hoja Docente
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Context Academic Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
            <span>Universidad Estatal de Milagro</span>
            <span aria-hidden="true">·</span>
            <span>Facultad de Ciencias e Ingeniería</span>
            <span aria-hidden="true">·</span>
            <span>Pensamiento Computacional (96 horas)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Evaluación Diagnóstica y Formativa: Sesión Día 1
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-3xl leading-relaxed">
            Tema rector: <strong className="text-slate-800">El Viaje Invisible de los Datos y el Entorno Digital Diario</strong>. Diseñado bajo estándares de acreditación universitaria para verificar el dominio de la conmutación de paquetes, el protocolo TCP/IP, redes LAN vs WAN y los ISPs en Ecuador.
          </p>

          {/* 4 Thematic Pillars (Unboxed metadata with typographic spacing) */}
          <div className="mt-4 pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <Cpu className="w-3.5 h-3.5 text-sky-600" />
              1. Fraccionamiento en Paquetes
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <Server className="w-3.5 h-3.5 text-sky-600" />
              2. Protocolos TCP/IP
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <Wifi className="w-3.5 h-3.5 text-sky-600" />
              3. Redes LAN vs WAN & Router
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <Globe2 className="w-3.5 h-3.5 text-sky-600" />
              4. ISPs en Ecuador (CNT, Netlife, Claro)
            </span>
          </div>
        </div>

        {/* Dynamic View rendering */}
        {activeView === 'quiz' && (
          <InteractiveQuiz
            onViewMatrix={() => setActiveView('matrix')}
            onOpenSimulator={() => setActiveView('simulator')}
          />
        )}

        {activeView === 'simulator' && (
          <div className="space-y-6">
            <NetworkSimulator />
          </div>
        )}

        {activeView === 'matrix' && (
          <AcademicMatrix />
        )}

      </main>

      {/* Institutional Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-700">
              Universidad Estatal de Milagro (UNEMI) · Proyecto de Vinculación
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Dirección: Ing. Erick Ruano Lara, MSc. | PhD(c) · Docente Asociado: Ing. Jhonny Darwin Ortiz Mata, MSc.
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <button 
              onClick={() => setShowBiblioModal(true)}
              className="hover:text-slate-900 transition-colors"
            >
              Marco Teórico y Fuentes
            </button>
            <span aria-hidden="true">·</span>
            <span>Periodo Académico: Agosto - Diciembre 2026</span>
          </div>
        </div>
      </footer>

      {/* Bibliography Modal */}
      {showBiblioModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 border border-slate-200 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <BookMarked className="w-5 h-5 text-sky-700" />
                <span>Fundamento Bibliográfico del Comité Académico</span>
              </div>
              <button
                onClick={() => setShowBiblioModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="font-semibold text-slate-900 mb-1">
                  1. Tanenbaum, A. S., & Wetherall, D. J. (2011)
                </p>
                <p className="text-slate-600">
                  <em>Redes de computadoras</em> (5.ª ed.). Pearson Educación. 
                  Sustenta la teoría de conmutación de paquetes, el modelo de capas TCP/IP y el reensamblaje de datagramas independientes.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="font-semibold text-slate-900 mb-1">
                  2. Forouzan, B. A. (2007)
                </p>
                <p className="text-slate-600">
                  <em>Transmisión de datos y redes de comunicaciones</em> (4.ª ed.). McGraw-Hill Interamericana. 
                  Sustenta la taxonomía de redes LAN, WLAN y WAN, y la arquitectura de conmutación de dispositivos enrutadores.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="font-semibold text-slate-900 mb-1">
                  3. Compendio Institucional UNEMI (2026)
                </p>
                <p className="text-slate-600">
                  <em>Compendio de la Asignatura de Pensamiento Computacional - Unidad 1</em>. Facultad de Ciencias e Ingeniería, UNEMI.
                  Define el comportamiento de paquetes, analogía del servicio postal, rol de ISPs en Ecuador (CNT, Claro, Netlife, Movistar) y el router como guardia de tránsito.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="font-semibold text-slate-900 mb-1">
                  4. UNESCO (2020) & Area (2012)
                </p>
                <p className="text-slate-600">
                  Competencias digitales críticas para la educación superior del siglo XXI y el desenvolvimiento ético y riguroso en entornos universitarios.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowBiblioModal(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
