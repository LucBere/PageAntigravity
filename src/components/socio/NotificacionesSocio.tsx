import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, AlertTriangle, Info, CheckCircle2, X } from 'lucide-react';

type NotificationType = 'urgent' | 'info' | 'success';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  isImportant: boolean;
}

export default function NotificacionesSocio() {
  const navigate = useNavigate();

  const initialNotifications: Notification[] = [
    {
      id: '1',
      type: 'urgent',
      title: 'TU CUOTA VENCE MAÑANA',
      message: 'Evita recargos abonando antes del vencimiento.',
      time: 'Hace 2 horas',
      isRead: false,
      isImportant: true,
    },
    {
      id: '2',
      type: 'info',
      title: 'NUEVA CLASE DISPONIBLE',
      message: 'Se ha abierto un nuevo horario para Cross Training.',
      time: 'Hace 5 horas',
      isRead: false,
      isImportant: false,
    },
    {
      id: '3',
      type: 'info',
      title: 'CAMBIO EN SALA 4',
      message: 'Mantenimiento preventivo en equipamiento de cardio.',
      time: 'Ayer',
      isRead: true,
      isImportant: false,
    },
    {
      id: '4',
      type: 'success',
      title: 'COMPROBANTE DISPONIBLE - Pago Octubre',
      message: 'Tu pago ha sido procesado exitosamente.',
      time: 'Hace 2 días',
      isRead: false,
      isImportant: false,
    },
    {
      id: '5',
      type: 'info',
      title: 'ACTUALIZACIÓN DE POLÍTICAS DE COBRO',
      message: 'Por favor revisa las nuevas políticas administrativas.',
      time: 'Hace 1 semana',
      isRead: true,
      isImportant: true,
    }
  ];

  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<'todas' | 'no_leidas' | 'importantes'>('todas');
  const [showModal, setShowModal] = useState(false);

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'no_leidas') return !n.isRead;
    if (activeTab === 'importantes') return n.isImportant;
    return true;
  });

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const renderIcon = (type: NotificationType) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-500" />;
      case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />;
      case 'info': return <Info className="w-5 h-5 text-[#7B8B9E]" />;
    }
  };

  const renderBorder = (type: NotificationType) => {
    switch (type) {
      case 'urgent': return 'border-l-4 border-l-red-500 border-y border-r border-slate-200 dark:border-slate-200 dark:border-zinc-800/50';
      case 'success': return 'border-l-4 border-l-emerald-500 border-y border-r border-slate-200 dark:border-slate-200 dark:border-zinc-800/50';
      case 'info': return 'border border-slate-200 dark:border-slate-200 dark:border-zinc-800/50';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-4xl mx-auto pb-12 relative">
      
      {/* MODAL HORARIOS */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50 dark:bg-[#0E0E0E] transition-colors duration-300/90 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#151515] border border-slate-200 dark:border-zinc-800 rounded-3xl p-8 max-w-sm w-full relative shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-colors shadow-sm dark:shadow-none">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-wider mb-4 uppercase">Grilla de Horarios</h2>
            <div className="bg-slate-50 dark:bg-[#1A1A1A] rounded-xl p-6 border border-slate-200 dark:border-zinc-800 mb-6">
              <p className="text-slate-500 dark:text-zinc-400 font-bold tracking-widest text-xs leading-relaxed text-center">
                LUNES A VIERNES<br/>
                <span className="text-slate-900 dark:text-white text-lg">08:00 a 22:00</span>
              </p>
            </div>
            <button 
              onClick={() => setShowModal(false)}
              className="w-full bg-slate-800 dark:bg-[#7B8B9E] hover:bg-[#6A788A] text-white py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-colors cursor-pointer"
            >
              CERRAR
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-[11px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-[0.3em] mb-2 flex items-center">
            <Bell className="w-3.5 h-3.5 mr-2" /> BUZÓN DE ENTRADA
          </h1>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center">
            NOTIFICACIONES
            {unreadCount > 0 && (
              <span className="ml-3 bg-slate-800 dark:bg-[#7B8B9E] text-white text-[10px] py-1 px-2.5 rounded-full">
                {unreadCount} NUEVAS
              </span>
            )}
          </h2>
        </div>
        <button 
          onClick={markAllAsRead}
          className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:text-white uppercase tracking-widest transition-colors cursor-pointer border border-slate-200 dark:border-zinc-800 hover:border-zinc-600 px-4 py-2 rounded-lg"
        >
          MARCAR TODAS COMO LEÍDAS
        </button>
      </div>

      {/* TABS */}
      <div className="bg-slate-50 dark:bg-[#1A1A1A] p-1.5 rounded-xl flex items-center space-x-1 mb-8 max-w-md">
        <button 
          onClick={() => setActiveTab('todas')}
          className={`flex-1 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer ${activeTab === 'todas' ? 'bg-slate-800 dark:bg-[#7B8B9E] text-white shadow-sm' : 'text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:text-white'}`}
        >
          TODAS
        </button>
        <button 
          onClick={() => setActiveTab('no_leidas')}
          className={`flex-1 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer ${activeTab === 'no_leidas' ? 'bg-slate-800 dark:bg-[#7B8B9E] text-white shadow-sm' : 'text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:text-white'}`}
        >
          NO LEÍDAS
        </button>
        <button 
          onClick={() => setActiveTab('importantes')}
          className={`flex-1 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer ${activeTab === 'importantes' ? 'bg-slate-800 dark:bg-[#7B8B9E] text-white shadow-sm' : 'text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:text-white'}`}
        >
          IMPORTANTES
        </button>
      </div>

      {/* LISTA DE NOTIFICACIONES */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-[#151515] border border-slate-200 dark:border-slate-200 dark:border-zinc-800/50 rounded-2xl transition-colors shadow-sm dark:shadow-none">
            <p className="text-slate-500 dark:text-zinc-500 text-sm font-bold tracking-widest uppercase">No hay notificaciones en esta categoría.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div 
              key={notif.id}
              className={`bg-white dark:bg-[#151515] rounded-2xl p-6 relative flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${renderBorder(notif.type)} ${!notif.isRead ? 'shadow-[0_4px_20px_rgba(0,0,0,0.3)]' : 'opacity-70 hover:opacity-100'}`}
            >
              {/* Indicador No Leído */}
              {!notif.isRead && (
                <div className="absolute top-6 right-6 w-2.5 h-2.5 rounded-full bg-slate-800 dark:bg-[#7B8B9E] shadow-[0_0_8px_rgba(123,139,158,0.8)]"></div>
              )}

              {/* Contenido Izquierdo */}
              <div className="flex items-start">
                <div className="mt-1 mr-4 bg-slate-50 dark:bg-[#1A1A1A] p-3 rounded-xl border border-slate-200 dark:border-zinc-800">
                  {renderIcon(notif.type)}
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className={`text-sm font-black uppercase tracking-wider ${notif.type === 'urgent' ? 'text-red-600 dark:text-red-500' : 'text-slate-900 dark:text-white'}`}>
                      {notif.title}
                    </h3>
                    {notif.isImportant && (
                      <span className="bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">IMPORTANTE</span>
                    )}
                  </div>
                  <p className="text-slate-500 dark:text-zinc-400 text-xs font-medium tracking-wide mb-2 leading-relaxed max-w-xl">
                    {notif.message}
                  </p>
                  <span className="text-[9px] text-slate-400 dark:text-zinc-600 font-bold uppercase tracking-widest">
                    {notif.time}
                  </span>
                </div>
              </div>

              {/* Acciones Derecha */}
              <div className="flex-shrink-0 md:w-auto w-full">
                {notif.id === '1' && (
                  <button 
                    onClick={() => navigate('/socio/checkout')}
                    className="w-full md:w-auto px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-500 border border-red-500/30 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-colors cursor-pointer"
                  >
                    PAGAR AHORA
                  </button>
                )}
                {notif.id === '2' && (
                  <button 
                    onClick={() => {
                      setShowModal(true);
                      markAsRead(notif.id);
                    }}
                    className="w-full md:w-auto px-6 py-3 bg-slate-50 dark:bg-[#1A1A1A] hover:bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white border border-slate-300 dark:border-zinc-700 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-colors cursor-pointer"
                  >
                    VER HORARIOS
                  </button>
                )}
                {notif.id !== '1' && notif.id !== '2' && !notif.isRead && (
                  <button 
                    onClick={() => markAsRead(notif.id)}
                    className="w-full md:w-auto px-6 py-3 bg-slate-50 dark:bg-[#1A1A1A] hover:bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white border border-slate-300 dark:border-zinc-700 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-colors cursor-pointer"
                  >
                    ENTENDIDO
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
