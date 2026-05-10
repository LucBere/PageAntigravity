import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Building2, QrCode, Lock, ShieldCheck, CheckCircle2, Copy, Tag } from 'lucide-react';

export default function CheckoutSocio() {
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState('Plan Musculación');
  const [paymentMethod, setPaymentMethod] = useState('tarjeta');
  const [discountType, setDiscountType] = useState('Sin Promoción');
  const [couponCode, setCouponCode] = useState('');
  
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const plans = {
    'Plan Musculación': 15000,
    'Pase Libre': 22000,
    'Cross Training': 18000
  };

  const discounts = {
    'Sin Promoción': 0,
    'Por Amigos': 0.10,
    'Plan Familiar': 0.15,
    'Días Especiales': 0.20,
    'Cupón': 0
  };

  let discountFactor = discounts[discountType as keyof typeof discounts] || 0;
  if (discountType === 'Cupón' && couponCode.toUpperCase() === 'SQUAT100') {
    discountFactor = 0.50; // Just an example fake coupon
  }

  const basePrice = plans[selectedPlan as keyof typeof plans];
  const discountAmount = basePrice * discountFactor;
  const priceAfterDiscount = basePrice - discountAmount;
  const iva = priceAfterDiscount * 0.21;
  const total = priceAfterDiscount + iva;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    setCardNumber(value);
  };

  const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setCardHolder(value.toUpperCase());
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/socio/pagos');
      }, 2000);
    }, 2000);
  };

  const isFormValid = () => {
    if (paymentMethod === 'tarjeta') {
      return cardNumber.length === 19 && cardHolder.length > 0 && expiry.length > 0 && cvv.length >= 3;
    }
    return true;
  };

  const copyCBU = () => {
    navigator.clipboard.writeText('0000003100000000000001');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 relative">
      
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E0E0E]/90 backdrop-blur-sm">
          <div className="bg-[#151515] border border-emerald-500/30 p-8 rounded-3xl flex flex-col items-center shadow-[0_0_50px_rgba(16,185,129,0.1)]">
            <CheckCircle2 className="w-20 h-20 text-emerald-500 mb-6" />
            <h2 className="text-2xl font-black text-white tracking-wider mb-2">¡PAGO COMPLETADO!</h2>
            <p className="text-zinc-400 font-medium tracking-widest text-xs">Redirigiendo a tus pagos...</p>
          </div>
        </div>
      )}

      <div className="mb-8 hidden md:block">
        <h1 className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.3em]">CHECKOUT SQUATGYM</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          
          {/* 1. SELECCIONAR PLAN */}
          <div>
            <h2 className="text-[11px] font-bold text-[#7B8B9E] uppercase tracking-widest mb-4">1. SELECCIONAR PLAN</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Plan Musculación', 'Pase Libre', 'Cross Training'].map((plan) => (
                <div 
                  key={plan}
                  onClick={() => setSelectedPlan(plan)}
                  className={`bg-[#151515] border rounded-2xl p-6 cursor-pointer transition-colors relative ${selectedPlan === plan ? 'border-[#7B8B9E] shadow-[0_0_15px_rgba(123,139,158,0.1)]' : 'border-zinc-800/50 hover:border-zinc-600'}`}
                >
                  {selectedPlan === plan && (
                    <div className="absolute top-4 right-4 text-[#7B8B9E]">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  )}
                  <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${selectedPlan === plan ? 'text-[#7B8B9E]' : 'text-white'}`}>{plan}</h3>
                  <p className="text-3xl font-black text-white tracking-tighter">
                    ${plans[plan as keyof typeof plans].toLocaleString()} <span className="text-[10px] font-bold text-zinc-500 tracking-normal uppercase">/ MES</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. PROMOCIONES Y DESCUENTOS */}
          <div>
            <h2 className="text-[11px] font-bold text-[#7B8B9E] uppercase tracking-widest mb-4">2. PROMOCIONES Y DESCUENTOS</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {['Sin Promoción', 'Por Amigos', 'Plan Familiar', 'Días Especiales', 'Cupón'].map((promo) => (
                <div 
                  key={promo}
                  onClick={() => setDiscountType(promo)}
                  className={`bg-[#1A1A1A] border rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${discountType === promo ? 'border-[#7B8B9E] shadow-[0_0_10px_rgba(123,139,158,0.1)]' : 'border-zinc-800 hover:border-zinc-600'}`}
                >
                  <Tag className={`w-4 h-4 mb-2 ${discountType === promo ? 'text-[#7B8B9E]' : 'text-zinc-600'}`} />
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${discountType === promo ? 'text-white' : 'text-zinc-400'}`}>{promo}</span>
                  {promo !== 'Sin Promoción' && promo !== 'Cupón' && (
                    <span className="text-[10px] text-zinc-500 mt-1">{discounts[promo as keyof typeof discounts] * 100}% OFF</span>
                  )}
                </div>
              ))}
            </div>
            
            {discountType === 'Cupón' && (
              <div className="mt-4 bg-[#151515] p-4 rounded-xl border border-zinc-800 flex items-center space-x-3">
                <input 
                  type="text"
                  placeholder="INGRESAR CÓDIGO DE CUPÓN"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-[#1A1A1A] border border-zinc-700 rounded-lg py-2.5 px-4 text-xs text-white font-bold tracking-widest uppercase placeholder-zinc-600 focus:outline-none focus:border-[#7B8B9E] transition-colors"
                />
              </div>
            )}
          </div>

          {/* 3. MÉTODO DE PAGO */}
          <div>
            <h2 className="text-[11px] font-bold text-[#7B8B9E] uppercase tracking-widest mb-4">3. MÉTODO DE PAGO</h2>
            <div className="bg-[#1A1A1A] p-1.5 rounded-xl flex items-center space-x-1">
              <button 
                onClick={() => setPaymentMethod('tarjeta')}
                className={`flex-1 flex items-center justify-center py-3 rounded-lg shadow-sm transition-colors cursor-pointer ${paymentMethod === 'tarjeta' ? 'bg-[#7B8B9E] text-white' : 'text-zinc-500 hover:text-white'}`}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                <span className="text-[10px] font-bold uppercase tracking-widest">TARJETA</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('transferencia')}
                className={`flex-1 flex items-center justify-center py-3 rounded-lg shadow-sm transition-colors cursor-pointer ${paymentMethod === 'transferencia' ? 'bg-[#7B8B9E] text-white' : 'text-zinc-500 hover:text-white'}`}
              >
                <Building2 className="w-4 h-4 mr-2" />
                <span className="text-[10px] font-bold uppercase tracking-widest">TRANSFERENCIA</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('qr')}
                className={`flex-1 flex items-center justify-center py-3 rounded-lg shadow-sm transition-colors cursor-pointer ${paymentMethod === 'qr' ? 'bg-[#7B8B9E] text-white' : 'text-zinc-500 hover:text-white'}`}
              >
                <QrCode className="w-4 h-4 mr-2" />
                <span className="text-[10px] font-bold uppercase tracking-widest">QR</span>
              </button>
            </div>
          </div>

          {/* 4. DETALLES DE PAGO */}
          <div className="bg-[#151515] p-8 md:p-10 rounded-3xl border-l-4 border-l-emerald-500 border-y border-r border-zinc-800/50 shadow-[-10px_0_30px_rgba(16,185,129,0.05)] relative overflow-hidden">
            <h2 className="text-3xl font-normal text-white uppercase tracking-wider mb-8 relative z-10">
              DETALLES DE PAGO
            </h2>

            <form onSubmit={handleConfirm} className="space-y-6 relative z-10">
              {paymentMethod === 'tarjeta' && (
                <>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">TITULAR DE LA TARJETA</label>
                    <input type="text" placeholder="NOMBRE COMPLETO" value={cardHolder} onChange={handleCardHolderChange} className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-4 px-5 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-emerald-500 transition-colors" required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">NÚMERO DE TARJETA</label>
                    <div className="relative">
                      <input type="text" placeholder="0000 0000 0000 0000" value={cardNumber} onChange={handleCardNumberChange} className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-4 px-5 pr-16 text-sm text-white tracking-widest placeholder-zinc-700 focus:outline-none focus:border-emerald-500 transition-colors font-mono" required />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                        <div className={`w-6 h-4 rounded-sm ${cardNumber.startsWith('4') ? 'bg-blue-600' : cardNumber.startsWith('5') ? 'bg-red-500' : 'bg-zinc-700'}`}></div>
                        <div className="w-6 h-4 bg-zinc-700 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">VENCIMIENTO</label>
                      <input type="text" placeholder="MM / YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-4 px-5 text-sm text-white tracking-widest placeholder-zinc-700 focus:outline-none focus:border-emerald-500 transition-colors font-mono text-center" required />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">CVV</label>
                      <input type="password" placeholder="***" maxLength={4} value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))} className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-xl py-4 px-5 text-sm text-white tracking-widest placeholder-zinc-700 focus:outline-none focus:border-emerald-500 transition-colors font-mono text-center" required />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === 'transferencia' && (
                <div className="bg-[#1A1A1A] border border-zinc-800 rounded-xl p-6 text-center space-y-4">
                  <Building2 className="w-12 h-12 text-[#7B8B9E] mx-auto mb-2" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">BANCO</p>
                    <p className="text-lg font-bold text-white tracking-widest">SQUAT BANK</p>
                  </div>
                  <div className="space-y-1 pt-4 border-t border-zinc-800">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">ALIAS</p>
                    <p className="text-lg font-bold text-white tracking-widest">SQUAT.ELITE.GYM</p>
                  </div>
                  <div className="space-y-1 pt-4 border-t border-zinc-800 relative">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">CBU</p>
                    <p className="text-lg font-bold text-emerald-500 tracking-widest font-mono">0000003100000000000001</p>
                    <button type="button" onClick={copyCBU} className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer">
                      {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? '¡COPIADO!' : 'COPIAR CBU'}</span>
                    </button>
                  </div>
                </div>
              )}

              {paymentMethod === 'qr' && (
                <div className="bg-[#1A1A1A] border border-zinc-800 rounded-xl p-8 flex flex-col items-center text-center space-y-6">
                  <div className="bg-white p-4 rounded-xl">
                    <QrCode className="w-48 h-48 text-[#0E0E0E]" />
                  </div>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Escanea el código desde tu app<br/>de pago favorita</p>
                </div>
              )}

              <button type="submit" disabled={!isFormValid() || isProcessing} className={`w-full py-5 rounded-2xl text-lg font-black uppercase tracking-[0.2em] transition-all duration-300 mt-8 ${!isFormValid() ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' : 'bg-[#388E3C] hover:bg-emerald-600 text-[#0E0E0E] shadow-lg shadow-[#388E3C]/20 cursor-pointer'}`}>
                {isProcessing ? 'PROCESANDO...' : 'CONFIRMAR PAGO'}
              </button>

              <div className="flex items-center justify-center space-x-2 mt-6 text-zinc-600">
                <Lock className="w-3 h-3" />
                <p className="text-[9px] font-bold uppercase tracking-[0.2em]">TRANSMISIÓN ENCRIPTADA DE 256 BITS • KINETIC SECURE</p>
              </div>
            </form>
          </div>
        </div>

        {/* COLUMNA DERECHA (Resumen) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#151515] p-8 rounded-3xl border border-zinc-800/50">
            <h2 className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.3em] mb-8">RESUMEN DE ORDEN</h2>
            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">PLAN {selectedPlan.toUpperCase()}</span>
                <span className="text-sm font-bold text-white tracking-wider">${basePrice.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">INSCRIPCIÓN</span>
                <span className="text-sm font-bold text-white tracking-wider">$0.00</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#7B8B9E] uppercase tracking-widest">
                  {discountType !== 'Sin Promoción' ? `DESCUENTO (${discountType.toUpperCase()})` : 'DESCUENTO'}
                </span>
                <span className="text-sm font-bold text-[#7B8B9E] tracking-wider">-${discountAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">IMPUESTOS (IVA 21%)</span>
                <span className="text-sm font-bold text-white tracking-wider">${iva.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
              </div>
            </div>

            <div className="border-t border-zinc-800/80 pt-8 flex items-center justify-between">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">TOTAL A PAGAR</span>
              <div className="text-right flex flex-col items-end">
                <span className="text-4xl font-black text-[#388E3C] tracking-tighter flex items-end">
                  ${total.toLocaleString(undefined, {minimumFractionDigits: 2})} <span className="text-[10px] font-bold text-zinc-500 uppercase ml-2 tracking-widest mb-2">ARS</span>
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-800/80 to-[#151515] p-8 rounded-3xl border border-zinc-700/50 relative overflow-hidden flex flex-col items-center text-center mt-6">
            <ShieldCheck className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-zinc-500/10" />
            <div className="relative z-10 py-4">
              <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-3">MEMBRESÍA ACTIVA</h3>
              <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-[0.2em] leading-relaxed max-w-[200px] mx-auto">ACCESO TOTAL 24/7 EN TODAS LAS SUCURSALES DEL PAÍS</p>
              <h4 className="text-xl font-black text-zinc-600 uppercase tracking-widest mt-6 opacity-30">SAFEE WORK</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
