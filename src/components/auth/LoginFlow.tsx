import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Step = 'LOGIN_STUDENT' | 'LOGIN_STAFF' | 'REGISTER' | 'MEDICAL_DECLARATION' | 'FORGOT_PASSWORD';

export default function LoginFlow() {
  const [currentStep, setCurrentStep] = useState<Step>('LOGIN_STUDENT');

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-zinc-100 font-sans flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-[#64748B]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-zinc-800/40 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {currentStep === 'LOGIN_STUDENT' && <LoginStudent setStep={setCurrentStep} />}
        {currentStep === 'LOGIN_STAFF' && <LoginStaff setStep={setCurrentStep} />}
        {currentStep === 'REGISTER' && <Register setStep={setCurrentStep} />}
        {currentStep === 'MEDICAL_DECLARATION' && <MedicalDeclaration setStep={setCurrentStep} />}
        {currentStep === 'FORGOT_PASSWORD' && <ForgotPassword setStep={setCurrentStep} />}
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function LoginStudent({ setStep }: { setStep: (step: Step) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    let isValid = true;

    if (!email) {
      setEmailError('El email es requerido');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Formato de email inválido');
      isValid = false;
    }

    if (!password) {
      setPasswordError('La contraseña es requerida');
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const userEmail = email.toLowerCase();

      if (userEmail === 'admin@squatgym.com') {
        navigate('/admin');
      } else if (userEmail === 'secretaria@squatgym.com') {
        navigate('/secretaria');
      } else if (userEmail === 'socio@squatgym.com') {
        navigate('/socio');
      } else if (userEmail === 'error@gym.com') {
        setGeneralError('Credenciales incorrectas');
      } else if (userEmail.includes('admin')) {
        navigate('/admin');
      } else if (userEmail.includes('secretaria')) {
        navigate('/secretaria');
      } else if (userEmail.includes('socio') || userEmail.includes('alumno')) {
        navigate('/socio');
      } else {
        navigate('/socio'); // Fallback natural para la pestaña de alumno
      }
    }, 2000);
  };

  const handleDemoClick = (demoEmail: string, demoPass: string, route: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setEmailError('');
    setPasswordError('');
    setGeneralError('');
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      navigate(route);
    }, 1500);
  };

  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/50 p-8 rounded-2xl shadow-2xl">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-[#64748B] rounded-xl mb-4 flex items-center justify-center">
          <span className="text-[#0E0E0E] font-black text-2xl">SQ</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white mb-2">SQUATGYM</h1>
      </div>

      <div className="flex mb-6 bg-[#0E0E0E]/50 p-1 rounded-lg border border-zinc-800/50">
        <button className="flex-1 py-2 text-sm font-semibold rounded-md bg-zinc-800 text-white shadow-sm transition-all">Alumno</button>
        <button onClick={() => setStep('LOGIN_STAFF')} className="flex-1 py-2 text-sm font-medium rounded-md text-zinc-400 hover:text-white transition-all">Staff</button>
      </div>

      {generalError && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center">
          {generalError}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleLogin}>
        <div>
          <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">Mail o DNI</label>
          <input
            type="text"
            placeholder="Ingresa tu identificación"
            className={`w-full bg-[#0E0E0E] border ${emailError ? 'border-red-500' : 'border-zinc-800'} rounded-lg p-3 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            className={`w-full bg-[#0E0E0E] border ${passwordError ? 'border-red-500' : 'border-zinc-800'} rounded-lg p-3 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>

        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded bg-zinc-900 border-zinc-800 text-[#64748B] focus:ring-[#64748B]/50" />
            <span className="text-sm text-zinc-400">Recordarme</span>
          </label>
          <button type="button" onClick={() => setStep('FORGOT_PASSWORD')} className="text-sm text-zinc-300 hover:text-white font-medium transition-colors">¿Olvidaste tu contraseña?</button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-[#64748B] hover:bg-zinc-200 text-[#0E0E0E] font-bold py-3.5 rounded-lg transition-all mt-6 shadow-[0_0_15px_rgba(250,250,250,0.1)] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Validando credenciales...' : 'INICIAR SESIÓN'}
        </button>
      </form>

      {/* Cuentas de Demostración */}
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800/50"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-zinc-900/60 text-zinc-500 font-medium tracking-wider text-[10px]">CUENTAS DE DEMOSTRACIÓN</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handleDemoClick('admin@squatgym.com', 'admin123', '/admin')}
            className="flex items-center justify-center py-2.5 px-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all group"
          >
            <span className="text-[11px] font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors">Demo Admin</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoClick('secretaria@squatgym.com', 'secretaria123', '/secretaria')}
            className="flex items-center justify-center py-2.5 px-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all group"
          >
            <span className="text-[11px] font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors">Demo Secretaría</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoClick('socio@squatgym.com', 'socio123', '/socio')}
            className="flex items-center justify-center py-2.5 px-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all group"
          >
            <span className="text-[11px] font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors">Demo Alumno</span>
          </button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-zinc-400">¿No tienes una cuenta? <button onClick={() => setStep('REGISTER')} className="text-white hover:underline font-bold transition-colors">Registrarse</button></p>
      </div>

      <div className="mt-8 pt-6 border-t border-zinc-800/50 text-center">
        <p className="text-xs text-zinc-600 font-semibold tracking-widest">Bienvenido a SquatGym</p>
      </div>
    </div>
  );
}

function LoginStaff({ setStep }: { setStep: (step: Step) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Secretaria');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    let isValid = true;

    if (!email) {
      setEmailError('El email es requerido');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Formato de email inválido');
      isValid = false;
    }

    if (!password) {
      setPasswordError('La contraseña es requerida');
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (email === 'error@gym.com') {
        setGeneralError('Credenciales incorrectas');
      } else {
        if (role === 'Administrador') {
          navigate('/admin');
        } else if (role === 'Secretaria') {
          navigate('/secretaria');
        } else {
          alert(`El panel de ${role} se encuentra en construcción.`);
        }
      }
    }, 2000);
  };

  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/50 p-8 rounded-2xl shadow-2xl">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-[#64748B] rounded-xl mb-4 flex items-center justify-center border border-zinc-700">
          <span className="text-[#0E0E0E] font-black text-2xl">SQ</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white mb-2">SQUATGYM</h1>
        <p className="text-zinc-400">Panel de Staff</p>
      </div>

      <div className="flex mb-6 bg-[#0E0E0E]/50 p-1 rounded-lg border border-zinc-800/50">
        <button onClick={() => setStep('LOGIN_STUDENT')} className="flex-1 py-2 text-sm font-medium rounded-md text-zinc-400 hover:text-white transition-all">Alumno</button>
        <button className="flex-1 py-2 text-sm font-semibold rounded-md bg-zinc-800 text-white shadow-sm transition-all">Staff</button>
      </div>

      {generalError && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center">
          {generalError}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleLogin}>
        <div className="relative">
          <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">Rol</label>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-[#0E0E0E]/50 border border-zinc-800 rounded-lg p-3 text-zinc-100 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all cursor-pointer flex justify-between items-center"
          >
            <span>{role}</span>
            <svg className={`w-4 h-4 transition-transform duration-200 text-zinc-400 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>

          {isDropdownOpen && (
            <div className="absolute z-20 w-full mt-2 bg-[#0E0E0E] border border-zinc-800 rounded-lg shadow-2xl overflow-hidden backdrop-blur-xl">
              {['Secretaria', 'Entrenador', 'Administrador'].map((option) => (
                <div
                  key={option}
                  className={`p-3 cursor-pointer transition-colors text-sm ${role === option ? 'bg-[#64748B]/20 text-[#64748B] font-bold border-l-2 border-[#64748B]' : 'text-zinc-300 hover:bg-zinc-800/50 hover:text-white border-l-2 border-transparent'}`}
                  onClick={() => {
                    setRole(option);
                    setIsDropdownOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">Mail o DNI</label>
          <input
            type="text"
            placeholder="Ingresa tu identificación"
            className={`w-full bg-[#0E0E0E]/50 border ${emailError ? 'border-red-500' : 'border-zinc-800'} rounded-lg p-3 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            className={`w-full bg-[#0E0E0E]/50 border ${passwordError ? 'border-red-500' : 'border-zinc-800'} rounded-lg p-3 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>

        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded bg-zinc-900 border-zinc-800 text-zinc-300 focus:ring-zinc-400/50" />
            <span className="text-sm text-zinc-400">Recordarme</span>
          </label>
          <button type="button" onClick={() => setStep('FORGOT_PASSWORD')} className="text-sm text-zinc-300 hover:text-white font-medium transition-colors">¿Olvidaste tu contraseña?</button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-[#64748B] hover:bg-zinc-200 text-[#0E0E0E] font-bold py-3.5 rounded-lg transition-all mt-6 shadow-[0_0_15px_rgba(250,250,250,0.1)] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Validando credenciales...' : 'INICIAR SESIÓN'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-zinc-400">¿Dificultades para ingresar? <button className="text-white hover:underline font-bold transition-colors">Contactar Soporte</button></p>
      </div>

      <div className="mt-8 pt-6 border-t border-zinc-800/50 text-center">
        <p className="text-xs text-zinc-600 font-semibold tracking-widest">Bienvenido a SquatGym</p>
      </div>
    </div>
  );
}

function Register({ setStep }: { setStep: (step: Step) => void }) {
  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/50 p-8 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 bg-[#64748B] rounded-xl mb-4 flex items-center justify-center">
          <span className="text-[#0E0E0E] font-black text-xl">SQ</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-white mb-2">Únete a SquatGym</h1>
        <p className="text-sm text-zinc-400 text-center">Crea tu cuenta de alumno para empezar a entrenar.</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep('MEDICAL_DECLARATION'); }}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">Nombre/s</label>
            <input type="text" placeholder="Tu nombre" className="w-full bg-[#0E0E0E]/50 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all text-sm" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">Apellido/s</label>
            <input type="text" placeholder="Tu apellido" className="w-full bg-[#0E0E0E]/50 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all text-sm" />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">DNI</label>
          <input type="text" placeholder="Documento Nacional de Identidad" className="w-full bg-[#0E0E0E]/50 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all text-sm" />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">Fecha de Nacimiento</label>
          <input type="date" className="w-full bg-[#0E0E0E]/50 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all text-sm color-scheme-dark" />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">Email</label>
          <input type="email" placeholder="ejemplo@gym.com" className="w-full bg-[#0E0E0E]/50 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all text-sm" />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">Teléfono</label>
          <input type="tel" placeholder="+54 000 000 000" className="w-full bg-[#0E0E0E]/50 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all text-sm" />
        </div>

        <button type="submit" className="w-full bg-[#64748B] hover:bg-zinc-200 text-[#0E0E0E] font-bold py-3 rounded-lg transition-all mt-4 shadow-[0_0_15px_rgba(250,250,250,0.2)]">CREAR CUENTA</button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-zinc-400">¿Ya tienes una cuenta? <button onClick={() => setStep('LOGIN_STUDENT')} className="text-[#64748B] hover:text-zinc-300 font-bold transition-colors">Iniciar sesión</button></p>
      </div>
    </div>
  );
}

function MedicalDeclaration({ setStep }: { setStep: (step: Step) => void }) {
  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/50 p-8 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar w-[500px] max-w-[95vw] -ml-4 sm:ml-0">
      <div className="mb-6 border-b border-zinc-800/50 pb-4">
        <h2 className="text-2xl font-black text-white mb-2">Declaración Jurada de Salud</h2>
        <p className="text-sm text-zinc-400">Por favor, completa la siguiente información con veracidad para garantizar tu seguridad durante el entrenamiento.</p>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep('LOGIN_STUDENT'); }}>
        {/* Section 1 */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-widest mb-3">Antecedentes Médicos</h3>

          <label className="flex items-center justify-between p-3 bg-[#0E0E0E]/40 rounded-lg border border-zinc-800/50 hover:border-zinc-700 transition-colors cursor-pointer">
            <span className="text-sm text-zinc-300">¿Padece alguna enfermedad cardiovascular?</span>
            <input type="checkbox" className="w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-[#64748B] focus:ring-[#64748B]/50" />
          </label>
          <label className="flex items-center justify-between p-3 bg-[#0E0E0E]/40 rounded-lg border border-zinc-800/50 hover:border-zinc-700 transition-colors cursor-pointer">
            <span className="text-sm text-zinc-300">¿Tiene asma o problemas respiratorios?</span>
            <input type="checkbox" className="w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-[#64748B] focus:ring-[#64748B]/50" />
          </label>
          <label className="flex items-center justify-between p-3 bg-[#0E0E0E]/40 rounded-lg border border-zinc-800/50 hover:border-zinc-700 transition-colors cursor-pointer">
            <span className="text-sm text-zinc-300">¿Sufre de presión alta?</span>
            <input type="checkbox" className="w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-[#64748B] focus:ring-[#64748B]/50" />
          </label>
          <label className="flex items-center justify-between p-3 bg-[#0E0E0E]/40 rounded-lg border border-zinc-800/50 hover:border-zinc-700 transition-colors cursor-pointer">
            <span className="text-sm text-zinc-300">¿Ha tenido cirugías recientes?</span>
            <input type="checkbox" className="w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-[#64748B] focus:ring-[#64748B]/50" />
          </label>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-widest mb-3 pt-2">Medicación y Alergias</h3>

          <div>
            <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">Detalle medicación actual</label>
            <textarea rows={2} placeholder="Enumere medicamentos que toma regularmente..." className="w-full bg-[#0E0E0E]/50 border border-zinc-800 rounded-lg p-3 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all text-sm resize-none"></textarea>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">Alergias conocidas</label>
            <textarea rows={2} placeholder="Describa alergias alimentarias, químicas o ambientales..." className="w-full bg-[#0E0E0E]/50 border border-zinc-800 rounded-lg p-3 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all text-sm resize-none"></textarea>
          </div>
        </div>

        {/* Section 3 */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-widest mb-3 pt-2">Contacto de Emergencia</h3>

          <div>
            <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">Nombre del contacto</label>
            <input type="text" placeholder="Nombre completo" className="w-full bg-[#0E0E0E]/50 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all text-sm" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">Teléfono de emergencia</label>
            <input type="tel" placeholder="+54 000 000 000" className="w-full bg-[#0E0E0E]/50 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all text-sm" />
          </div>
        </div>

        {/* Section 4 */}
        <div className="pt-4 pb-2">
          <label className="flex items-start space-x-3 cursor-pointer bg-[#64748B]/5 p-4 rounded-lg border border-[#64748B]/20">
            <input type="checkbox" required className="mt-1 w-4 h-4 rounded bg-zinc-900 border-[#64748B]/50 text-[#64748B] focus:ring-[#64748B]/50" />
            <span className="text-xs text-zinc-300 leading-relaxed">
              Declaro bajo juramento que los datos aquí consignados son verídicos y que me encuentro en condiciones físicas para realizar actividad física. Entiendo que ocultar información médica puede representar un riesgo para mi salud.
            </span>
          </label>
        </div>

        <button type="submit" className="w-full bg-[#64748B] hover:bg-zinc-200 text-[#0E0E0E] font-bold py-3.5 rounded-lg transition-all shadow-[0_0_15px_rgba(250,250,250,0.2)]">ENVIAR Y FINALIZAR REGISTRO</button>
      </form>
    </div>
  );
}

function ForgotPassword({ setStep }: { setStep: (step: Step) => void }) {
  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/50 p-8 rounded-2xl shadow-2xl">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-zinc-800 rounded-full mb-6 flex items-center justify-center border border-zinc-700">
          <svg className="w-8 h-8 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-white mb-3 text-center">Recuperar Contraseña</h1>
        <p className="text-sm text-zinc-400 text-center px-4 leading-relaxed">Ingresa tu email y te enviaremos los pasos para restablecer tu contraseña.</p>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep('LOGIN_STUDENT'); }}>
        <div>
          <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">Mail</label>
          <input type="email" required placeholder="nombre@ejemplo.com" className="w-full bg-[#0E0E0E]/50 border border-zinc-800 rounded-lg p-3.5 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all" />
        </div>

        <button type="submit" className="w-full bg-[#64748B] hover:bg-zinc-200 text-[#0E0E0E] font-bold py-3.5 rounded-lg transition-all shadow-[0_0_15px_rgba(250,250,250,0.2)]">ENVIAR INSTRUCCIONES</button>
      </form>

      <div className="mt-8 text-center border-t border-zinc-800/50 pt-6">
        <button onClick={() => setStep('LOGIN_STUDENT')} className="text-sm text-zinc-400 hover:text-white font-medium transition-colors flex items-center justify-center w-full">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Volver al inicio de sesión
        </button>
      </div>
    </div>
  );
}