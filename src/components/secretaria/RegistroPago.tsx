import React, { useState } from 'react';
import { Search, CreditCard, CheckCircle, Info, Zap, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Plan = {
  id: string;
  nombre: string;
  precio: number;
};

const PLANES: Plan[] = [
  { id: 'musculacion', nombre: 'Plan Musculación', precio: 15000 },
  { id: 'pase-libre', nombre: 'Pase Libre', precio: 22000 },
  { id: 'cross-training', nombre: 'Cross Training', precio: 18000 }
];

export default function RegistroPago() {
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [descuentoPorcentaje, setDescuentoPorcentaje] = useState(0);

  const [metodoPago, setMetodoPago] = useState('tarjeta');
  
  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [montoRecibido, setMontoRecibido] = useState('');

  const handleNombreTarjeta = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    setNombreTarjeta(val);
  };

  const handleNumeroTarjeta = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const limitedValue = rawValue.slice(0, 16);
    const formattedValue = limitedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    setNumeroTarjeta(formattedValue);
  };

  const subtotal = selectedPlan ? selectedPlan.precio : 0;
  const descuentoCalculado = subtotal * (descuentoPorcentaje / 100);
  const subtotalConDescuento = subtotal - descuentoCalculado;
  const iva = subtotalConDescuento * 0.21;
  const total = subtotalConDescuento + iva;

  return (
    <div className="bg-[#0E0E0E] min-h-full p-8 font-sans text-zinc-100">
      
      {/* 1. Encabezado */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase mb-4">
            SOCIOS
          </p>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase mb-2">
            REGISTRO DE PAGO
          </h1>
          <p className="text-sm text-zinc-400 tracking-wide">
            NUEVA TRANSACCIÓN DE SOCIO
          </p>
        </div>

        {/* 2. Layout de 2 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          
          {/* COLUMNA IZQUIERDA (Pasos) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* 00. BUSCAR SOCIO */}
            <div>
              <div className="flex items-center mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7B8B9E] mr-3"></div>
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  00. BUSCAR SOCIO
                </h3>
              </div>
              <div className="bg-[#151515] p-6 rounded-2xl border border-zinc-800/30 shadow-xl shadow-black/20">
                <div className="relative w-full">
                  <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7B8B9E]" />
                  <input
                    type="text"
                    placeholder="EJ: JUAN PEREZ O DNI 35.123.456"
                    className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-sm font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-[#7B8B9E] transition-colors uppercase"
                  />
                </div>
                <p className="text-[10px] text-zinc-500 mt-3 ml-2 italic">
                  Identifique al socio para vincular la transacción a su cuenta.
                </p>
              </div>
            </div>

            {/* 01. SELECCIÓN DE MEMBRESÍA */}
            <div>
              <div className="flex items-center mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7B8B9E] mr-3"></div>
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  01. SELECCIÓN DE MEMBRESÍA
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {PLANES.map((plan, index) => {
                  const isSelected = selectedPlan?.id === plan.id;
                  return (
                    <div 
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className={`p-6 rounded-2xl transition-colors cursor-pointer group relative ${isSelected ? 'bg-[#151515] border-2 border-[#7B8B9E] shadow-[0_0_15px_rgba(123,139,158,0.15)]' : 'bg-[#151515] border border-zinc-800/50 hover:border-zinc-700'}`}
                    >
                      {isSelected && (
                        <div className="absolute top-4 right-4 w-5 h-5 bg-[#7B8B9E] rounded flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                      )}
                      <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isSelected ? 'text-[#7B8B9E]' : 'text-zinc-500'}`}>OPCIÓN {index + 1}</p>
                      <p className={`text-lg font-bold mb-4 transition-colors ${isSelected ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>{plan.nombre}</p>
                      <p className={`text-xl font-black ${isSelected ? 'text-[#7B8B9E]' : 'text-zinc-500'}`}>${plan.precio.toLocaleString('es-AR')}</p>
                    </div>
                  );
                })}

              </div>
            </div>

            {/* 02. MÉTODO DE PAGO */}
            <div>
              <div className="flex items-center mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7B8B9E] mr-3"></div>
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  02. MÉTODO DE PAGO
                </h3>
              </div>
              
              <div className="bg-[#151515] rounded-2xl border border-zinc-800/30 p-2 mb-6">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <button 
                    onClick={() => setMetodoPago('tarjeta')}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold tracking-widest transition-colors text-center ${metodoPago === 'tarjeta' ? 'bg-[#7B8B9E] text-white shadow-lg shadow-[#7B8B9E]/20' : 'bg-transparent text-zinc-500 hover:text-white hover:bg-zinc-800/50'}`}
                  >
                    TARJETA
                  </button>
                  <button 
                    onClick={() => setMetodoPago('transferencia')}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold tracking-widest transition-colors text-center ${metodoPago === 'transferencia' ? 'bg-[#7B8B9E] text-white shadow-lg shadow-[#7B8B9E]/20' : 'bg-transparent text-zinc-500 hover:text-white hover:bg-zinc-800/50'}`}
                  >
                    TRANSFERENCIA
                  </button>
                  <button 
                    onClick={() => setMetodoPago('qr')}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold tracking-widest transition-colors text-center ${metodoPago === 'qr' ? 'bg-[#7B8B9E] text-white shadow-lg shadow-[#7B8B9E]/20' : 'bg-transparent text-zinc-500 hover:text-white hover:bg-zinc-800/50'}`}
                  >
                    QR
                  </button>
                  <button 
                    onClick={() => setMetodoPago('efectivo')}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold tracking-widest transition-colors text-center ${metodoPago === 'efectivo' ? 'bg-[#7B8B9E] text-white shadow-lg shadow-[#7B8B9E]/20' : 'bg-transparent text-zinc-500 hover:text-white hover:bg-zinc-800/50'}`}
                  >
                    EFECTIVO
                  </button>
                </div>
              </div>

              <div className="bg-[#151515] p-8 rounded-2xl border border-zinc-800/30 shadow-xl shadow-black/20">
                {metodoPago === 'tarjeta' && (
                  <div className="space-y-6">
                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        NOMBRE EN TARJETA
                      </label>
                      <input 
                        type="text" 
                        value={nombreTarjeta}
                        onChange={handleNombreTarjeta}
                        placeholder="JUAN PEREZ" 
                        className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-3 px-4 text-sm font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors uppercase"
                      />
                    </div>
                    
                    <div className="flex flex-col space-y-2 relative">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        NÚMERO DE TARJETA
                      </label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={numeroTarjeta}
                          onChange={handleNumeroTarjeta}
                          placeholder="0000 0000 0000 0000" 
                          className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-3 pl-4 pr-12 text-sm font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                        />
                        <CreditCard className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-600" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          VENCIMIENTO (MM/AA)
                        </label>
                        <input 
                          type="text" 
                          placeholder="MM/AA" 
                          className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-3 px-4 text-sm font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          CVV
                        </label>
                        <input 
                          type="password" 
                          placeholder="•••" 
                          className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-3 px-4 text-sm font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {metodoPago === 'transferencia' && (
                  <div className="flex flex-col items-center text-center space-y-6 py-2">
                    <div className="bg-[#1A1A1A] w-full p-6 rounded-xl border border-zinc-800">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">DATOS BANCARIOS DEL GIMNASIO</p>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-zinc-400">BANCO:</span>
                          <span className="text-sm font-bold text-white">SQUAT BANK</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-zinc-400">CBU:</span>
                          <span className="text-sm font-bold text-white">0000003100000000000001</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-zinc-400">ALIAS:</span>
                          <span className="text-sm font-bold text-white">SQUAT.ELITE.GYM</span>
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center px-6 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm font-bold text-white hover:bg-zinc-800 transition-colors">
                      VERIFICAR ACREDITACIÓN
                    </button>
                  </div>
                )}

                {metodoPago === 'qr' && (
                  <div className="flex flex-col items-center justify-center space-y-6 py-4">
                    <div className="w-48 h-48 bg-white p-2 rounded-xl flex items-center justify-center border-4 border-[#7B8B9E]">
                      <QrCode className="w-full h-full text-[#0E0E0E]" strokeWidth={1} />
                    </div>
                    <p className="text-sm text-zinc-400 font-medium">Solicite al socio que escanee el código para abonar</p>
                  </div>
                )}

                {metodoPago === 'efectivo' && (
                  <div className="space-y-6">
                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        MONTO RECIBIDO (CAJA)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 font-bold">$</span>
                        <input 
                          type="number" 
                          value={montoRecibido}
                          onChange={(e) => setMontoRecibido(e.target.value)}
                          placeholder="0.00" 
                          className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-4 pl-8 pr-4 text-2xl font-black text-white placeholder-zinc-600 focus:outline-none focus:border-[#7B8B9E] transition-colors"
                        />
                      </div>
                    </div>
                    <div className="bg-[#1A1A1A] p-4 rounded-xl border border-zinc-800 flex justify-between items-center">
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">VUELTO A ENTREGAR</span>
                      <span className={`text-xl font-black ${Number(montoRecibido) - total > 0 ? 'text-[#388E3C]' : 'text-zinc-500'}`}>
                        ${(Number(montoRecibido) - total > 0 ? Number(montoRecibido) - total : 0).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 04. SELECCIÓN DE DESCUENTO */}
            <div>
              <div className="flex items-center mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7B8B9E] mr-3"></div>
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  04. SELECCIÓN DE DESCUENTO
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                
                {/* SIN DESCUENTO */}
                <div onClick={() => setDescuentoPorcentaje(0)} className={`p-4 rounded-xl relative cursor-pointer flex flex-col items-center justify-center text-center transition-colors ${descuentoPorcentaje === 0 ? 'bg-[#151515] border-2 border-[#7B8B9E] shadow-[0_0_10px_rgba(123,139,158,0.1)]' : 'bg-[#151515] border border-zinc-800/50 hover:border-zinc-700 group'}`}>
                  {descuentoPorcentaje === 0 && (
                    <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-[#7B8B9E] rounded-sm flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                  <p className={`text-xs font-bold mb-0.5 ${descuentoPorcentaje === 0 ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>SIN PROMOCIÓN</p>
                  <p className={`text-[11px] ${descuentoPorcentaje === 0 ? 'text-[#7B8B9E]' : 'text-zinc-500'}`}>0%</p>
                </div>

                {/* POR AMIGOS */}
                <div onClick={() => setDescuentoPorcentaje(10)} className={`p-4 rounded-xl relative cursor-pointer flex flex-col items-center justify-center text-center transition-colors ${descuentoPorcentaje === 10 ? 'bg-[#151515] border-2 border-[#7B8B9E] shadow-[0_0_10px_rgba(123,139,158,0.1)]' : 'bg-[#151515] border border-zinc-800/50 hover:border-zinc-700 group'}`}>
                  {descuentoPorcentaje === 10 && (
                    <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-[#7B8B9E] rounded-sm flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                  <p className={`text-xs font-bold mb-0.5 ${descuentoPorcentaje === 10 ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>POR AMIGOS</p>
                  <p className={`text-[11px] ${descuentoPorcentaje === 10 ? 'text-[#7B8B9E]' : 'text-zinc-500'}`}>10%</p>
                </div>

                {/* PLAN FAMILIAR */}
                <div onClick={() => setDescuentoPorcentaje(15)} className={`p-4 rounded-xl relative cursor-pointer flex flex-col items-center justify-center text-center transition-colors ${descuentoPorcentaje === 15 ? 'bg-[#151515] border-2 border-[#7B8B9E] shadow-[0_0_10px_rgba(123,139,158,0.1)]' : 'bg-[#151515] border border-zinc-800/50 hover:border-zinc-700 group'}`}>
                  {descuentoPorcentaje === 15 && (
                    <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-[#7B8B9E] rounded-sm flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                  <p className={`text-xs font-bold mb-0.5 ${descuentoPorcentaje === 15 ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>PLAN FAMILIAR</p>
                  <p className={`text-[11px] ${descuentoPorcentaje === 15 ? 'text-[#7B8B9E]' : 'text-zinc-500'}`}>15%</p>
                </div>

                {/* DÍAS ESPECIALES */}
                <div onClick={() => setDescuentoPorcentaje(20)} className={`p-4 rounded-xl relative cursor-pointer flex flex-col items-center justify-center text-center transition-colors ${descuentoPorcentaje === 20 ? 'bg-[#151515] border-2 border-[#7B8B9E] shadow-[0_0_10px_rgba(123,139,158,0.1)]' : 'bg-[#151515] border border-zinc-800/50 hover:border-zinc-700 group'}`}>
                  {descuentoPorcentaje === 20 && (
                    <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-[#7B8B9E] rounded-sm flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                  <p className={`text-xs font-bold mb-0.5 ${descuentoPorcentaje === 20 ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>DÍAS ESPECIALES</p>
                  <p className={`text-[11px] ${descuentoPorcentaje === 20 ? 'text-[#7B8B9E]' : 'text-zinc-500'}`}>20%</p>
                </div>

                {/* CUPÓN */}
                <div className="bg-[#151515] p-4 rounded-xl border border-zinc-800/50 hover:border-zinc-700 cursor-pointer transition-colors group flex flex-col items-center justify-center text-center">
                  <p className="text-xs font-bold text-zinc-300 mb-0.5 group-hover:text-white">CUPÓN</p>
                  <p className="text-[11px] text-zinc-500">INGRESAR</p>
                </div>

              </div>
              
              <div className="mt-4 bg-[#151515] p-4 rounded-xl border border-zinc-800 flex items-center space-x-3 w-full md:w-1/2">
                <input 
                  type="text"
                  placeholder="INGRESAR CÓDIGO DE CUPÓN"
                  className="flex-1 bg-[#1A1A1A] border border-zinc-700 rounded-lg py-2.5 px-4 text-xs text-white font-bold tracking-widest uppercase placeholder-zinc-600 focus:outline-none focus:border-[#7B8B9E] transition-colors"
                />
              </div>
            </div>

            {/* BOTÓN CONFIRMAR PAGO (debajo de los pasos) */}
            <div className="mt-4 pb-12">
              <button 
                onClick={() => navigate('/secretaria/socios')}
                disabled={!selectedPlan}
                className={`w-full flex items-center justify-center px-8 py-5 text-white text-sm font-black tracking-[0.15em] uppercase rounded-xl transition-all shadow-lg ${!selectedPlan ? 'bg-[#388E3C] opacity-50 cursor-not-allowed shadow-[#388E3C]/10' : 'bg-[#388E3C] hover:bg-emerald-600 shadow-[#388E3C]/20 hover:shadow-[#388E3C]/40'}`}
              >
                <CheckCircle className="w-5 h-5 mr-3" />
                CONFIRMAR PAGO
              </button>
            </div>

          </div>

          {/* COLUMNA DERECHA (Resumen) */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Caja Resumen de Orden */}
            <div className="bg-[#151515] p-8 rounded-2xl border border-zinc-800/50 shadow-xl shadow-black/20 sticky top-8">
              <h2 className="text-lg font-bold text-white mb-2">Resumen de Orden</h2>
              <p className="text-[9px] text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-6 mb-6">
                VERIFIQUE LOS DATOS ANTES DE PROCESAR
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider">PRECIO MEMBRESÍA</span>
                  <span className="text-sm font-bold text-white">${subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider">DESCUENTO APLICADO</span>
                  <span className="text-sm font-bold text-[#EF4444]">-${descuentoCalculado.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider">IVA (21%)</span>
                  <span className="text-sm font-bold text-zinc-300">${iva.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-800 mb-8">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">TOTAL FINAL</p>
                <div className="text-4xl lg:text-5xl font-black text-white tracking-tighter">
                  ${total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div className="flex items-start bg-[#1A1A1A] p-4 rounded-xl border border-zinc-800/50">
                <Info className="w-4 h-4 text-zinc-500 mr-3 shrink-0 mt-0.5" />
                <p className="text-[10px] text-zinc-400 leading-relaxed">
                  Al confirmar el pago, el socio recibirá automáticamente el comprobante digital y la habilitación de su carnet mediante la App oficial de SquatGym.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
