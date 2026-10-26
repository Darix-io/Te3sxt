import React, { useState, useEffect } from 'react';
import { 
  Network, 
  Send, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  Wifi, 
  Server, 
  Laptop, 
  Smartphone, 
  Tv, 
  Globe,
  Radio,
  ArrowRight
} from 'lucide-react';

export const NetworkSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'packets' | 'lan_wan'>('packets');

  // Packet Simulator State
  const [message, setMessage] = useState('UNEMI COMPUTACIONAL');
  const [isSimulating, setIsSimulating] = useState(false);
  const [congestionNode, setCongestionNode] = useState<number | null>(2); // Node 2 has congestion
  const [step, setStep] = useState(0); // 0: Idle, 1: Fragmented, 2: In Flight, 3: Arrived, 4: Reassembled

  // LAN vs WAN Simulator State
  const [ispConnected, setIspConnected] = useState(true);
  const [selectedIsp, setSelectedIsp] = useState<'CNT' | 'Netlife' | 'Claro'>('CNT');
  const [pingTarget, setPingTarget] = useState<'local_printer' | 'remote_unemi'>('remote_unemi');
  const [pingStatus, setPingStatus] = useState<'idle' | 'testing' | 'success' | 'failure'>('idle');

  // Handle Packet simulation steps
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulating) {
      if (step < 4) {
        timer = setTimeout(() => {
          setStep((prev) => prev + 1);
        }, 1200);
      } else {
        setIsSimulating(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isSimulating, step]);

  const startPacketSimulation = () => {
    setStep(1);
    setIsSimulating(true);
  };

  const resetPacketSimulation = () => {
    setStep(0);
    setIsSimulating(false);
  };

  // Split message into 4 packets
  const words = message.trim() || 'DATOS_UNEMI';
  const chunkSize = Math.max(1, Math.ceil(words.length / 4));
  const packets = [
    { id: 1, content: words.slice(0, chunkSize), route: congestionNode === 1 ? 'Ruta Alterna (B)' : 'Ruta Troncal (A)' },
    { id: 2, content: words.slice(chunkSize, chunkSize * 2), route: congestionNode === 2 ? 'Ruta Desvío (C)' : 'Ruta Directa (B)' },
    { id: 3, content: words.slice(chunkSize * 2, chunkSize * 3), route: congestionNode === 3 ? 'Ruta Satelital (D)' : 'Ruta Marina (C)' },
    { id: 4, content: words.slice(chunkSize * 3), route: congestionNode === 4 ? 'Ruta Terrestre (E)' : 'Ruta Troncal (A)' },
  ];

  // Run ping test for LAN vs WAN
  const testConnection = (target: 'local_printer' | 'remote_unemi') => {
    setPingTarget(target);
    setPingStatus('testing');
    setTimeout(() => {
      if (target === 'local_printer') {
        // Local communication works regardless of external ISP connection
        setPingStatus('success');
      } else {
        // Remote WAN communication requires ISP connection
        setPingStatus(ispConnected ? 'success' : 'failure');
      }
    }, 700);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Simulation Header */}
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700">
            <Radio className="w-3.5 h-3.5" />
            <span>Laboratorio Didáctico de Redes · Sesión Día 1</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-0.5">
            Simulador Interactivo de Principios de Red
          </h2>
        </div>

        {/* Segmented Mode Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg shrink-0">
          <button
            onClick={() => setActiveTab('packets')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'packets'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Fraccionamiento de Paquetes
          </button>
          <button
            onClick={() => setActiveTab('lan_wan')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'lan_wan'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Router & Frontera LAN vs WAN
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'packets' ? (
          <div>
            {/* Context bar */}
            <div className="mb-6 bg-sky-50/60 border border-sky-100 rounded-lg p-4 text-xs text-sky-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <p className="leading-relaxed">
                <strong className="font-semibold text-sky-900">Concepto clave (Tanenbaum & Wetherall):</strong> La información no viaja íntegra. El protocolo TCP/IP la divide en paquetes autónomos que buscan dinámicamente la ruta más libre ante la congestión de nodos.
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-slate-600">Simular congestión en:</span>
                <select
                  aria-label="Nodo congestionado"
                  value={congestionNode ?? ''}
                  onChange={(e) => setCongestionNode(e.target.value ? Number(e.target.value) : null)}
                  className="bg-white border border-sky-200 text-sky-900 text-xs rounded px-2 py-1 font-medium focus:outline-none focus:ring-1 focus:ring-sky-500"
                >
                  <option value="">Sin congestión</option>
                  <option value="1">Nodo Troncal 1</option>
                  <option value="2">Nodo Troncal 2 (Intermedio)</option>
                  <option value="3">Nodo Troncal 3</option>
                  <option value="4">Nodo Troncal 4</option>
                </select>
              </div>
            </div>

            {/* Input & Simulation controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
              <div className="w-full sm:flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSimulating}
                  placeholder="Escribe un mensaje para fraccionar..."
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-60"
                  maxLength={36}
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={startPacketSimulation}
                  disabled={isSimulating || !message.trim()}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSimulating ? 'Transmitiendo en Red...' : 'Iniciar Transmisión'}
                </button>
                <button
                  onClick={resetPacketSimulation}
                  disabled={isSimulating}
                  className="inline-flex items-center justify-center p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                  title="Reiniciar simulador"
                  aria-label="Reiniciar simulador"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Canvas of the Network */}
            <div className="border border-slate-200 rounded-xl p-5 bg-gradient-to-b from-slate-50/50 to-white relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                
                {/* 1. Host Emisor (UNEMI) */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center mb-2">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase">Host Emisor</h3>
                  <span className="text-[11px] text-slate-500 mt-0.5">Estudiante · Campus UNEMI</span>
                  
                  <div className="mt-3 w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 text-left">
                    <div className="text-[11px] font-semibold text-slate-600 mb-1 flex items-center justify-between">
                      <span>Mensaje original:</span>
                      <span className="font-mono text-[10px] text-slate-400">15 MB</span>
                    </div>
                    <div className="font-mono text-xs bg-white p-1.5 rounded border border-slate-200 truncate text-slate-800 font-semibold">
                      "{message || 'Mensaje vacío'}"
                    </div>
                  </div>

                  {step >= 1 && (
                    <div className="mt-3 w-full animate-fadeIn">
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                        Fraccionamiento TCP (4 Paquetes):
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {packets.map((pkt) => (
                          <div 
                            key={pkt.id} 
                            className="bg-sky-50 border border-sky-200 p-1.5 rounded text-[11px] font-mono text-sky-900 flex flex-col text-left"
                          >
                            <span className="text-[9px] text-sky-600 font-bold">Pkt #{pkt.id}</span>
                            <span className="truncate font-semibold">"{pkt.content || ' '}"</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Malla de Nodos de Red (Internet Backbone) */}
                <div className="flex flex-col items-center justify-center p-3 relative">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                    <Network className="w-3.5 h-3.5 text-sky-600" />
                    <span>Nodos Intermedios de Internet</span>
                  </div>

                  <div className="w-full space-y-2.5">
                    {[1, 2, 3, 4].map((nodeId) => {
                      const isCongested = congestionNode === nodeId;
                      const hasPacketInFlight = step === 2;
                      return (
                        <div
                          key={nodeId}
                          className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                            isCongested
                              ? 'bg-amber-50/80 border-amber-300 text-amber-900'
                              : 'bg-white border-slate-200 text-slate-700 shadow-2xs'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Server className={`w-4 h-4 ${isCongested ? 'text-amber-600' : 'text-slate-500'}`} />
                            <span className="font-medium">Nodo Troncal #{nodeId}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {isCongested ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                                <AlertTriangle className="w-3 h-3" />
                                Saturado (Reroute)
                              </span>
                            ) : (
                              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                                Fluido · 1 Gbps
                              </span>
                            )}

                            {hasPacketInFlight && (
                              <span className="text-[10px] font-mono bg-sky-600 text-white px-1.5 py-0.5 rounded animate-pulse">
                                Pkt #{nodeId}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {step === 2 && (
                    <div className="mt-3 text-center text-xs font-semibold text-sky-700 flex items-center gap-1 animate-pulse">
                      <span>Enrutando paquetes por vías independientes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* 3. Host Receptor (Servidor Aula Virtual Moodle) */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                    <Server className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase">Servidor Destino</h3>
                  <span className="text-[11px] text-slate-500 mt-0.5">Plataforma Educativa Moodle</span>

                  <div className="mt-3 w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 text-left min-h-[140px] flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-slate-600 mb-1 flex items-center justify-between">
                        <span>Estado de recepción:</span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {step >= 3 ? '4/4 Paquetes' : `${step === 2 ? '2/4 en vuelo' : '0/4'}`}
                        </span>
                      </div>

                      {step < 3 ? (
                        <div className="py-6 text-center text-xs text-slate-400 italic">
                          Esperando paquetes de red...
                        </div>
                      ) : (
                        <div className="space-y-1 mt-2">
                          <span className="text-[10px] font-bold text-emerald-700 uppercase block">
                            Reensamblado en orden (TCP):
                          </span>
                          <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 p-2 rounded text-xs font-mono font-bold">
                            {message}
                          </div>
                        </div>
                      )}
                    </div>

                    {step === 4 && (
                      <div className="mt-2 text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>¡Verificación de integridad completada sin pérdidas!</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        ) : (
          /* LAN vs WAN Simulator */
          <div>
            <div className="mb-6 bg-slate-100/70 border border-slate-200 rounded-lg p-4 text-xs text-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <p className="leading-relaxed">
                <strong className="font-semibold text-slate-900">Paradoja del Día 1:</strong> "¿Por qué si cortan el cable exterior de fibra óptica el celular sigue conectado al Wi-Fi pero no carga TikTok ni Google?"
              </p>
              
              {/* ISP Enlace Toggle */}
              <div className="flex items-center gap-3 shrink-0 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-xs font-semibold text-slate-800">Cable Troncal ISP:</span>
                <button
                  onClick={() => {
                    setIspConnected(!ispConnected);
                    setPingStatus('idle');
                  }}
                  className={`px-2.5 py-1 text-xs font-bold rounded transition-colors ${
                    ispConnected
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-rose-600 text-white hover:bg-rose-700'
                  }`}
                >
                  {ispConnected ? 'Conectado (Normal)' : 'Cortado (Sin ISP)'}
                </button>
              </div>
            </div>

            {/* Architecture Canvas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* Local Area Network (LAN / WLAN) */}
              <div className="lg:col-span-7 bg-sky-50/40 border border-sky-200 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-sky-100 pb-2 mb-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-sky-900">
                      <Wifi className="w-4 h-4 text-sky-600" />
                      <span>RED LOCAL PRIVADA (LAN / WLAN DOMÉSTICA O CAMPUS)</span>
                    </div>
                    <span className="text-[10px] font-mono text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                      Subred 192.168.1.0/24
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mb-4">
                    Dispositivos locales gestionados por el router (conmutación interna activa las 24 horas):
                  </p>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-center shadow-2xs">
                      <Laptop className="w-5 h-5 mx-auto text-slate-700 mb-1" />
                      <div className="text-[11px] font-bold text-slate-900">Laptop</div>
                      <span className="text-[10px] font-mono text-slate-500">192.168.1.12</span>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-center shadow-2xs">
                      <Smartphone className="w-5 h-5 mx-auto text-slate-700 mb-1" />
                      <div className="text-[11px] font-bold text-slate-900">Celular</div>
                      <span className="text-[10px] font-mono text-slate-500">192.168.1.25</span>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-center shadow-2xs">
                      <Tv className="w-5 h-5 mx-auto text-slate-700 mb-1" />
                      <div className="text-[11px] font-bold text-slate-900">Smart TV</div>
                      <span className="text-[10px] font-mono text-slate-500">192.168.1.40</span>
                    </div>
                  </div>
                </div>

                {/* Router Component */}
                <div className="mt-5 bg-white p-3.5 rounded-xl border border-sky-300 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-xs">
                      RT
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Router / Access Point (Guardia de Tránsito)</div>
                      <div className="text-[11px] text-slate-500">IP Gateway: 192.168.1.1 · Conmuta paquetes locales</div>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                    WLAN Activa
                  </span>
                </div>
              </div>

              {/* Frontera & WAN (Global Internet) */}
              <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <Globe className="w-4 h-4 text-slate-600" />
                      <span>RED GLOBAL WAN (INTERNET & ISPS)</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      IP Pública Dinámica
                    </span>
                  </div>

                  <div className="mb-4">
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Proveedor de Servicio de Internet en Ecuador:
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['CNT', 'Netlife', 'Claro'] as const).map((isp) => (
                        <button
                          key={isp}
                          onClick={() => setSelectedIsp(isp)}
                          className={`text-xs py-1.5 px-2 rounded font-medium border transition-colors ${
                            selectedIsp === isp
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {isp}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Remote Servers */}
                  <div className="space-y-2">
                    <div className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                      ispConnected ? 'bg-white border-slate-200' : 'bg-slate-100 border-slate-300 opacity-60'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Server className="w-4 h-4 text-sky-600" />
                        <span className="font-semibold text-slate-800">Aula Virtual Moodle (UNEMI)</span>
                      </div>
                      <span className={`text-[10px] font-mono ${ispConnected ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                        {ispConnected ? 'Accesible' : 'Inalcanzable'}
                      </span>
                    </div>

                    <div className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                      ispConnected ? 'bg-white border-slate-200' : 'bg-slate-100 border-slate-300 opacity-60'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-emerald-600" />
                        <span className="font-semibold text-slate-800">Servidores Globales (Google / TikTok)</span>
                      </div>
                      <span className={`text-[10px] font-mono ${ispConnected ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                        {ispConnected ? 'Accesible' : 'Inalcanzable'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Connection Status Box */}
                <div className="mt-4 p-3 rounded-lg border bg-white border-slate-200">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Comprobar Comunicación de Paquetes:
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => testConnection('local_printer')}
                      disabled={pingStatus === 'testing'}
                      className="flex-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded transition-colors whitespace-nowrap"
                    >
                      Ping Local (LAN)
                    </button>
                    <button
                      onClick={() => testConnection('remote_unemi')}
                      disabled={pingStatus === 'testing'}
                      className="flex-1 px-2.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded transition-colors whitespace-nowrap"
                    >
                      Ping WAN (Internet)
                    </button>
                  </div>

                  {pingStatus !== 'idle' && (
                    <div className={`mt-2.5 p-2 rounded text-xs font-medium ${
                      pingStatus === 'testing'
                        ? 'bg-slate-100 text-slate-700 animate-pulse'
                        : pingStatus === 'success'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}>
                      {pingStatus === 'testing' && 'Enviando paquetes de prueba (ICMP Echo)...'}
                      {pingStatus === 'success' && pingTarget === 'local_printer' && (
                        <span>✓ Éxito: Tráfico interno dentro de la LAN funcional (dispositivos interconectados).</span>
                      )}
                      {pingStatus === 'success' && pingTarget === 'remote_unemi' && (
                        <span>✓ Éxito: Tráfico WAN recibido a través del ISP {selectedIsp} (puerta de enlace activa).</span>
                      )}
                      {pingStatus === 'failure' && (
                        <span>✗ Error: Fallo de enrutamiento hacia la WAN. El router responde localmente, pero el ISP está desconectado.</span>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
