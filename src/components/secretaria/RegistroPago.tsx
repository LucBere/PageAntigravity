import { Search, CreditCard, CheckCircle, Info, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RegistroPago() {
  const navigate = useNavigate();

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
                
                {/* MUSCULACIÓN */}
                <div className="bg-[#151515] p-6 rounded-2xl border border-zinc-800/50 hover:border-zinc-700 transition-colors cursor-pointer group">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">OPCIÓN 1</p>
                  <p className="text-lg font-bold text-zinc-300 mb-4 group-hover:text-white transition-colors">Plan Musculación</p>
                  <p className="text-xl font-black text-zinc-500">$15.000</p>
                </div>

                {/* PASE LIBRE (Activo) */}
                <div className="bg-[#151515] p-6 rounded-2xl border-2 border-[#7B8B9E] relative shadow-[0_0_15px_rgba(123,139,158,0.15)] cursor-pointer">
                  <div className="absolute top-4 right-4 w-5 h-5 bg-[#7B8B9E] rounded flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="text-[10px] font-bold text-[#7B8B9E] uppercase tracking-widest mb-2">OPCIÓN 2</p>
                  <p className="text-lg font-bold text-white mb-4">Pase Libre</p>
                  <p className="text-xl font-black text-[#7B8B9E]">$22.000</p>
                </div>

                {/* CROSS TRAINING */}
                <div className="bg-[#151515] p-6 rounded-2xl border border-zinc-800/50 hover:border-zinc-700 transition-colors cursor-pointer group">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">OPCIÓN 3</p>
                  <p className="text-lg font-bold text-zinc-300 mb-4 group-hover:text-white transition-colors">Cross Training</p>
                  <p className="text-xl font-black text-zinc-500">$18.000</p>
                </div>

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
                  <button className="flex-1 py-3 px-4 rounded-xl bg-[#7B8B9E] text-white text-xs font-bold tracking-widest shadow-lg shadow-[#7B8B9E]/20 text-center">
                    TARJETA
                  </button>
                  <button className="flex-1 py-3 px-4 rounded-xl bg-transparent text-zinc-500 hover:text-white hover:bg-zinc-800/50 text-xs font-bold tracking-widest transition-colors text-center">
                    TRANSFERENCIA
                  </button>
                  <button className="flex-1 py-3 px-4 rounded-xl bg-transparent text-zinc-500 hover:text-white hover:bg-zinc-800/50 text-xs font-bold tracking-widest transition-colors text-center">
                    QR
                  </button>
                  <button className="flex-1 py-3 px-4 rounded-xl bg-transparent text-zinc-500 hover:text-white hover:bg-zinc-800/50 text-xs font-bold tracking-widest transition-colors text-center">
                    EFECTIVO
                  </button>
                </div>
              </div>

              <div className="bg-[#151515] p-8 rounded-2xl border border-zinc-800/30 shadow-xl shadow-black/20">
                <div className="space-y-6">
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      NOMBRE EN TARJETA
                    </label>
                    <input 
                      type="text" 
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
                
                {/* SIN DESCUENTO (Activo) */}
                <div className="bg-[#151515] p-4 rounded-xl border border-[#7B8B9E] relative cursor-pointer shadow-[0_0_10px_rgba(123,139,158,0.1)] flex flex-col items-center justify-center text-center">
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-[#7B8B9E] rounded-sm flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="text-xs font-bold text-white mb-0.5">SIN PROMOCIÓN</p>
                  <p className="text-[11px] text-[#7B8B9E]">0%</p>
                </div>

                {/* POR AMIGOS */}
                <div className="bg-[#151515] p-4 rounded-xl border border-zinc-800/50 hover:border-zinc-700 cursor-pointer transition-colors group flex flex-col items-center justify-center text-center">
                  <p className="text-xs font-bold text-zinc-300 mb-0.5 group-hover:text-white">POR AMIGOS</p>
                  <p className="text-[11px] text-zinc-500">10%</p>
                </div>

                {/* PLAN FAMILIAR */}
                <div className="bg-[#151515] p-4 rounded-xl border border-zinc-800/50 hover:border-zinc-700 cursor-pointer transition-colors group flex flex-col items-center justify-center text-center">
                  <p className="text-xs font-bold text-zinc-300 mb-0.5 group-hover:text-white">PLAN FAMILIAR</p>
                  <p className="text-[11px] text-zinc-500">15%</p>
                </div>

                {/* DÍAS ESPECIALES */}
                <div className="bg-[#151515] p-4 rounded-xl border border-zinc-800/50 hover:border-zinc-700 cursor-pointer transition-colors group flex flex-col items-center justify-center text-center">
                  <p className="text-xs font-bold text-zinc-300 mb-0.5 group-hover:text-white">DÍAS ESPECIALES</p>
                  <p className="text-[11px] text-zinc-500">20%</p>
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
                className="w-full flex items-center justify-center px-8 py-5 bg-[#388E3C] hover:bg-emerald-600 text-white text-sm font-black tracking-[0.15em] uppercase rounded-xl transition-all shadow-lg shadow-[#388E3C]/20 hover:shadow-[#388E3C]/40"
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
                  <span className="text-sm font-bold text-white">$22.000,00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider">DESCUENTO APLICADO</span>
                  <span className="text-sm font-bold text-[#EF4444]">-$0,00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider">IVA (21%)</span>
                  <span className="text-sm font-bold text-zinc-300">$4.620,00</span>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-800 mb-8">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">TOTAL FINAL</p>
                <div className="text-4xl lg:text-5xl font-black text-white tracking-tighter">
                  $26.620,00
                </div>
              </div>

              <div className="flex items-start bg-[#1A1A1A] p-4 rounded-xl border border-zinc-800/50">
                <Info className="w-4 h-4 text-zinc-500 mr-3 shrink-0 mt-0.5" />
                <p className="text-[10px] text-zinc-400 leading-relaxed">
                  Al confirmar el pago, el socio recibirá automáticamente el comprobante digital y la habilitación de su carnet mediante la App oficial de SquatGym.
                </p>
              </div>
            </div>

            {/* Banner Publicitario */}
            <div className="bg-[#0a0a0a] rounded-2xl border border-zinc-800/30 overflow-hidden relative group">
              {/* Fondo abstracto simulado */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/80 to-[#0a0a0a] z-0"></div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#7B8B9E] rounded-full blur-[80px] opacity-20"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#388E3C] rounded-full blur-[80px] opacity-10"></div>
              
              <div className="relative z-10 p-8 h-48 flex flex-col justify-end">
                <div className="flex items-center mb-2 text-[#7B8B9E]">
                  <Zap className="w-3.5 h-3.5 mr-2" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">ALTA PERFORMANCE</span>
                </div>
                <h3 className="text-2xl font-black text-white uppercase leading-none tracking-tighter">
                  ENTRENA SIN<br/>LÍMITES.
                </h3>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
