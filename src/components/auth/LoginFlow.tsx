import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Step = 'LOGIN_STUDENT' | 'LOGIN_STAFF' | 'REGISTER' | 'FORGOT_PASSWORD';

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
        {currentStep === 'FORGOT_PASSWORD' && <ForgotPassword setStep={setCurrentStep} />}
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function LoginStudent({ setStep }: { setStep: (step: Step) => void }) {
  const [email, setEmail] = useState('alumno.prueba@squatgym.com');
  const [password, setPassword] = useState('alumno123');
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
  const [email, setEmail] = useState('admin@squatgym.com');
  const [password, setPassword] = useState('admin123');
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
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    fechaNacimiento: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'nombre' || name === 'apellido') {
      newValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    } else if (name === 'dni') {
      newValue = value.replace(/\D/g, '').slice(0, 8);
    } else if (name === 'telefono') {
      newValue = value.replace(/[^\d\s\-\+]/g, '').slice(0, 15);
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const isFormValid = 
    formData.nombre.trim() !== '' &&
    formData.apellido.trim() !== '' &&
    formData.dni.length === 8 &&
    formData.fechaNacimiento !== '' &&
    formData.email.trim() !== '' &&
    formData.telefono.trim() !== '' &&
    formData.password.trim() !== '' &&
    formData.password === formData.confirmPassword;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('LOGIN_STUDENT');
    }, 1000);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/50 p-8 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 bg-[#64748B] rounded-xl mb-4 flex items-center justify-center">
          <span className="text-[#0E0E0E] font-black text-xl">SQ</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-white mb-2">Únete a SquatGym</h1>
        <p className="text-sm text-zinc-400 text-center">Crea tu cuenta de alumno para empezar a entrenar.</p>
      </div>

      <form className="space-y-4" onSubmit={handleRegister}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">Nombre/s</label>
            <input 
              type="text" 
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre" 
              className="w-full bg-[#0E0E0E]/50 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all text-sm" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">Apellido/s</label>
            <input 
              type="text" 
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Tu apellido" 
              className="w-full bg-[#0E0E0E]/50 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all text-sm" 
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">DNI</label>
          <input 
            type="text" 
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            maxLength={8}
            placeholder="Documento Nacional de Identidad" 
            className="w-full bg-[#0E0E0E]/50 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all text-sm" 
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">Fecha de Nacimiento</label>
          <input 
            type="date" 
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            max={today}
            className="w-full bg-[#0E0E0E]/50 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all text-sm color-scheme-dark" 
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@gym.com" 
            className="w-full bg-[#0E0E0E]/50 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all text-sm" 
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">Teléfono</label>
          <input 
            type="tel" 
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            maxLength={15}
            placeholder="+54 000 000 000" 
            className="w-full bg-[#0E0E0E]/50 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all text-sm" 
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">Contraseña</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••" 
              className="w-full bg-[#0E0E0E]/50 border border-zinc-800 rounded-lg p-2.5 pr-10 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all text-sm" 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              {showPassword ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">Confirmar Contraseña</label>
          <div className="relative">
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••" 
              className={`w-full bg-[#0E0E0E]/50 border ${formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-500' : 'border-zinc-800'} rounded-lg p-2.5 pr-10 text-zinc-100 placeholder-zinc-600 focus:border-[#64748B] focus:ring-1 focus:ring-[#64748B] outline-none transition-all text-sm`} 
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              {showConfirmPassword ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )}
            </button>
          </div>
          {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <p className="text-red-500 text-[10px] mt-1">Las contraseñas no coinciden</p>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isLoading || !isFormValid}
          className={`w-full font-bold py-3 rounded-lg transition-all mt-4 ${(!isFormValid || isLoading) ? 'bg-[#64748B] text-[#0E0E0E] opacity-50 cursor-not-allowed' : 'bg-[#64748B] hover:bg-zinc-200 text-[#0E0E0E] shadow-[0_0_15px_rgba(250,250,250,0.2)]'}`}
        >
          {isLoading ? 'CREANDO CUENTA...' : 'CREAR CUENTA'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-zinc-400">¿Ya tienes una cuenta? <button onClick={() => setStep('LOGIN_STUDENT')} className="text-[#64748B] hover:text-zinc-300 font-bold transition-colors">Iniciar sesión</button></p>
      </div>
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