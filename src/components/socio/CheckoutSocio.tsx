import { useNavigate } from 'react-router-dom';
import { CreditCard, Building2, QrCode, Lock, ShieldCheck } from 'lucide-react';

export default function CheckoutSocio() {
  const navigate = useNavigate();

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulamos proceso de pago
    navigate('/socio/pagos');
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Topbar/Header simulado en el contenido */}
      <div className="mb-8 hidden md:block">
        <h1 className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.3em]">CHECKOUT SQUATGYM</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COLUMNA IZQUIERDA (Formulario y Pasos) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* 1. SELECCIONAR PLAN */}
          <div>
            <h2 className="text-[11px] font-bold text-[#7B8B9E] uppercase tracking-widest mb-4">1. SELECCIONAR PLAN</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Plan Regular */}
              <div className="bg-[#151515] border border-zinc-800/50 rounded-2xl p-6 cursor-pointer hover:border-zinc-600 transition-colors">
                <h3 className="text-[10px] font-bold text-white uppercase tracking-widest mb-4">REGULAR</h3>
                <p className="text-4xl font-black text-white tracking-tighter">
                  $150 <span className="text-[10px] font-bold text-zinc-500 tracking-normal uppercase">/ MES</span>
                </p>
              </div>

              {/* Plan Platinum */}
              <div className="bg-[#151515] border border-zinc-800/50 rounded-2xl p-6 cursor-pointer hover:border-zinc-600 transition-colors">
                <h3 className="text-[10px] font-bold text-white uppercase tracking-widest mb-4">PLATINUM</h3>
                <p className="text-4xl font-black text-white tracking-tighter">
                  $750 <span className="text-[10px] font-bold text-zinc-500 tracking-normal uppercase">/ MES</span>
                </p>
              </div>

              {/* Plan Black Pro (Activo) */}
              <div className="bg-[#151515] border border-[#7B8B9E]/50 rounded-2xl p-6 relative shadow-[0_0_20px_rgba(123,139,158,0.1)] cursor-pointer">
                <div className="absolute top-0 right-0 bg-zinc-200 text-[#0E0E0E] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-lg rounded-tr-2xl">
                  AHORRO 20%
                </div>
                <h3 className="text-[10px] font-bold text-[#7B8B9E] uppercase tracking-widest mb-4">BLACK PRO</h3>
                <p className="text-4xl font-black text-white tracking-tighter">
                  $1,200 <span className="text-[10px] font-bold text-zinc-500 tracking-normal uppercase">/ MES</span>
                </p>
              </div>
            </div>
          </div>

          {/* 2. MÉTODO DE PAGO */}
          <div>
            <h2 className="text-[11px] font-bold text-[#7B8B9E] uppercase tracking-widest mb-4">2. MÉTODO DE PAGO</h2>
            <div className="bg-[#1A1A1A] p-1.5 rounded-xl flex items-center space-x-1">
              <button className="flex-1 flex items-center justify-center py-3 bg-[#7B8B9E] rounded-lg shadow-sm text-white transition-colors cursor-pointer">
                <CreditCard className="w-4 h-4 mr-2" />
                <span className="text-[10px] font-bold uppercase tracking-widest">TARJETA</span>
              </button>
              <button className="flex-1 flex items-center justify-center py-3 text-zinc-500 hover:text-white transition-colors cursor-pointer">
                <Building2 className="w-4 h-4 mr-2" />
                <span className="text-[10px] font-bold uppercase tracking-widest">TRANSFERENCIA</span>
              </button>
              <button className="flex-1 flex items-center justify-center py-3 text-zinc-500 hover:text-white transition-colors cursor-pointer">
                <QrCode className="w-4 h-4 mr-2" />
                <span className="text-[10px] font-bold uppercase tracking-widest">QR</span>
              </button>
            </div>
          </div>

          {/* 3. DETALLES DE PAGO (Formulario) */}
          <div className="bg-[#151515] p-8 md:p-10 rounded-3xl border-l-4 border-l-emerald-500 border-y border-r border-zinc-800/50 shadow-[-10px_0_30px_rgba(16,185,129,0.05)] relative overflow-hidden">
            <h2 className="text-3xl font-normal text-white uppercase tracking-wider mb-8 relative z-10">
              DETALLES DE PAGO
            </h2>

            <form onSubmit={handleConfirm} className="space-y-6 relative z-10">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                  TITULAR DE LA TARJETA
                </label>
                <input 
                  type="text" 
                  placeholder="NOMBRE COMPLETO" 
                  className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-4 px-5 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                  NÚMERO DE TARJETA
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="0000 0000 0000 0000" 
                    className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-4 px-5 pr-16 text-sm text-white tracking-widest placeholder-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono"
                    required
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <div className="w-6 h-4 bg-zinc-700 rounded-sm"></div>
                    <div className="w-6 h-4 bg-zinc-700 rounded-sm"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                    VENCIMIENTO
                  </label>
                  <input 
                    type="text" 
                    placeholder="MM / YY" 
                    className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-4 px-5 text-sm text-white tracking-widest placeholder-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono text-center"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                    CVV
                  </label>
                  <input 
                    type="password" 
                    placeholder="***" 
                    className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-4 px-5 text-sm text-white tracking-widest placeholder-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono text-center"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#388E3C] hover:bg-emerald-600 text-[#0E0E0E] py-5 rounded-2xl text-lg font-black uppercase tracking-[0.2em] transition-colors shadow-lg shadow-[#388E3C]/20 mt-8 cursor-pointer"
              >
                CONFIRMAR PAGO
              </button>

              <div className="flex items-center justify-center space-x-2 mt-6 text-zinc-600">
                <Lock className="w-3 h-3" />
                <p className="text-[9px] font-bold uppercase tracking-[0.2em]">
                  TRANSMISIÓN ENCRIPTADA DE 256 BITS • KINETIC SECURE
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* COLUMNA DERECHA (Resumen) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Tarjeta Resumen */}
          <div className="bg-[#151515] p-8 rounded-3xl border border-zinc-800/50">
            <h2 className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.3em] mb-8">
              RESUMEN DE ORDEN
            </h2>

            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">PLAN BLACK PRO</span>
                <span className="text-sm font-bold text-white tracking-wider">$1,200.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">INSCRIPCIÓN</span>
                <span className="text-sm font-bold text-white tracking-wider">$0.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">IMPUESTOS (IVA)</span>
                <span className="text-sm font-bold text-white tracking-wider">$252.00</span>
              </div>
            </div>

            <div className="border-t border-zinc-800/80 pt-8 flex items-center justify-between">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">TOTAL A PAGAR</span>
              <div className="text-right flex flex-col items-end">
                <span className="text-4xl font-black text-[#7B8B9E] tracking-tighter flex items-end">
                  $1,452.00 <span className="text-[10px] font-bold text-zinc-500 uppercase ml-2 tracking-widest mb-2">ARS</span>
                </span>
              </div>
            </div>
          </div>

          {/* Tarjeta Banner Inferior */}
          <div className="bg-gradient-to-br from-zinc-800/80 to-[#151515] p-8 rounded-3xl border border-zinc-700/50 relative overflow-hidden flex flex-col items-center text-center mt-6">
            <ShieldCheck className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-zinc-500/10" />
            <div className="relative z-10 py-4">
              <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-3">MEMBRESÍA ACTIVA</h3>
              <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-[0.2em] leading-relaxed max-w-[200px] mx-auto">
                ACCESO TOTAL 24/7 EN TODAS LAS SUCURSALES DEL PAÍS
              </p>
              <h4 className="text-xl font-black text-zinc-600 uppercase tracking-widest mt-6 opacity-30">SAFEE WORK</h4>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
