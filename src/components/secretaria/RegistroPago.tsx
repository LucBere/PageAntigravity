import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function RegistroPago() {
  const navigate = useNavigate();
  
  // Paso 1: Agregar el Estado del Modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Paso 2: Modificar la Acción de Pago
  const handleConfirmPayment = () => {
    // Simulamos un pequeño proceso antes de mostrar el modal (opcional, lo mostramos directo para mejor UX inmediata)
    setShowSuccessModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 relative">
      
      {/* Contenido Simulado de Fondo (Basado en la imagen de referencia) */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight uppercase">RECLAMOS DE PAGO</h1>
        <p className="text-sm text-zinc-400 mt-1">Gestión y verificación de pagos adeudados.</p>
      </div>

      {/* Botón de ejemplo para disparar el modal */}
      <div className="bg-zinc-900/60 p-8 rounded-2xl border border-zinc-800/50 flex flex-col items-start gap-4">
        <p className="text-zinc-300 text-sm">Al procesar el pago del socio, presione confirmar.</p>
        <button 
          onClick={handleConfirmPayment}
          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-emerald-600/20"
        >
          CONFIRMAR PAGO
        </button>
      </div>

      {/* Paso 3: Construir el Componente Modal (JSX) */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          
          <div className="bg-[#151515] rounded-2xl p-8 max-w-md w-full mx-4 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] text-center">
            
            {/* Ícono */}
            <div className="bg-[#1A1A1A] border border-zinc-800 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>

            {/* Título */}
            <h2 className="text-white text-xl md:text-2xl font-bold mb-2">
              ¡PAGO VERIFICADO<br/>CON ÉXITO!
            </h2>
            
            {/* Subtítulo */}
            <p className="text-zinc-400 text-sm mb-8">
              Actualizado en el sistema para el socio correspondiente.
            </p>

            {/* Botón de Acción */}
            <button 
              onClick={() => navigate('/secretaria/socios')}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 transition-colors text-white font-bold tracking-widest rounded-xl"
            >
              VOLVER
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
