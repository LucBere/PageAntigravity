// Dataset agregado para la búsqueda global de la top bar.
// Reúne socios, usuarios/personal y deudores tomados de los datos mock
// de las distintas pantallas, para poder buscarlos desde cualquier rol.

export type SearchCategoria = 'Socio' | 'Usuario' | 'Deudor';

export interface SearchEntry {
  id: string;
  nombre: string;
  dni?: string;
  email?: string;
  categoria: SearchCategoria;
  detalle: string; // plan, rol o motivo
  ruta: string; // a dónde navegar al hacer clic
}

export const searchEntries: SearchEntry[] = [
  // ---- SOCIOS ----
  { id: 'soc-1', nombre: 'Marcos Paz', dni: '34.902.112', categoria: 'Socio', detalle: 'Plan Musculación Full', ruta: '/secretaria/socios' },
  { id: 'soc-2', nombre: 'Julia Benitez', dni: '40.112.559', categoria: 'Socio', detalle: 'Plan Cross Training', ruta: '/secretaria/socios' },
  { id: 'soc-3', nombre: 'Ricardo Centurión', dni: '28.774.301', categoria: 'Socio', detalle: 'Plan Personalizado', ruta: '/secretaria/socios' },
  { id: 'soc-4', nombre: 'Sofía Velazquez', dni: '42.880.122', categoria: 'Socio', detalle: 'Plan Musculación', ruta: '/secretaria/socios' },
  { id: 'soc-5', nombre: 'Lucas Gomez', dni: '35.441.221', categoria: 'Socio', detalle: 'Pase Libre', ruta: '/secretaria/socios' },
  { id: 'soc-6', nombre: 'Micaela Suarez', dni: '39.882.114', categoria: 'Socio', detalle: 'Plan Musculación', ruta: '/secretaria/socios' },
  { id: 'soc-7', nombre: 'Tomás Aquino', dni: '41.203.491', categoria: 'Socio', detalle: 'Plan Cross Training', ruta: '/secretaria/socios' },
  { id: 'soc-8', nombre: 'Valentina Rios', dni: '38.102.993', categoria: 'Socio', detalle: 'Plan Personalizado', ruta: '/secretaria/socios' },
  { id: 'soc-9', nombre: 'Juan Perez', dni: '32.114.552', categoria: 'Socio', detalle: 'Plan Musculación Full', ruta: '/secretaria/socios' },
  { id: 'soc-10', nombre: 'Camila Torres', dni: '43.001.229', categoria: 'Socio', detalle: 'Pase Libre', ruta: '/secretaria/socios' },
  { id: 'soc-11', nombre: 'Gonzalo Martinez', dni: '37.881.002', categoria: 'Socio', detalle: 'Plan Cross Training', ruta: '/secretaria/socios' },
  { id: 'soc-12', nombre: 'Lucía Fernández', dni: '36.992.118', categoria: 'Socio', detalle: 'Plan Musculación', ruta: '/secretaria/socios' },

  // ---- USUARIOS / PERSONAL ----
  { id: 'usr-1', nombre: 'Marcus Thorne', email: 'm.thorne@squatgym.com', categoria: 'Usuario', detalle: 'Administrador', ruta: '/admin/usuarios' },
  { id: 'usr-2', nombre: 'Elena Rodriguez', email: 'e.rodriguez@squatgym.com', categoria: 'Usuario', detalle: 'Profesor', ruta: '/admin/usuarios' },
  { id: 'usr-3', nombre: 'Julian Vane', email: 'j.vane@squatgym.com', categoria: 'Usuario', detalle: 'Recepcionista', ruta: '/admin/usuarios' },
  { id: 'usr-4', nombre: 'Sarah Connor', email: 's.connor@squatgym.com', categoria: 'Usuario', detalle: 'Administrador', ruta: '/admin/usuarios' },
  { id: 'usr-5', nombre: 'David Miller', email: 'd.miller@squatgym.com', categoria: 'Usuario', detalle: 'Profesor', ruta: '/admin/usuarios' },
  { id: 'usr-6', nombre: 'Ana Silva', email: 'a.silva@squatgym.com', categoria: 'Usuario', detalle: 'Recepcionista', ruta: '/admin/usuarios' },
  { id: 'usr-7', nombre: 'Lucia Fernandez', email: 'l.fernandez@squatgym.com', categoria: 'Usuario', detalle: 'Administrador', ruta: '/admin/usuarios' },
  { id: 'usr-8', nombre: 'Martin Lopez', email: 'm.lopez@squatgym.com', categoria: 'Usuario', detalle: 'Profesor', ruta: '/admin/usuarios' },

  // ---- DEUDORES / CLIENTES EN MORA ----
  { id: 'deu-1', nombre: 'Lucía Fernández', dni: '38.452.910', categoria: 'Deudor', detalle: 'Musculación · 45 días de mora', ruta: '/admin/finanzas/mora' },
  { id: 'deu-2', nombre: 'Marcos Rossi', dni: '41.201.033', categoria: 'Deudor', detalle: 'Cross Training · 12 días de mora', ruta: '/admin/finanzas/mora' },
  { id: 'deu-3', nombre: 'Sofía Méndez', dni: '35.981.222', categoria: 'Deudor', detalle: 'Pase Libre · 62 días de mora', ruta: '/admin/finanzas/mora' },
  { id: 'deu-4', nombre: 'Joaquin Silva', dni: '42.333.111', categoria: 'Deudor', detalle: 'Pase Libre · 95 días de mora', ruta: '/admin/finanzas/mora' },
  { id: 'deu-5', nombre: 'Camila Ríos', dni: '39.888.666', categoria: 'Deudor', detalle: 'Cross Training · 100 días de mora', ruta: '/admin/finanzas/mora' },
  { id: 'deu-6', nombre: 'Paula Blanco', dni: '35.555.222', categoria: 'Deudor', detalle: 'Cross Training · 110 días de mora', ruta: '/admin/finanzas/mora' },
];
