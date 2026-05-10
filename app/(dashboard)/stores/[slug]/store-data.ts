export type Attendee = {
  name: string;
  initials: string;
  color: string; // hex — fundo do avatar
};

export type MaintenanceEvent = {
  // id é opcional: presente quando vem do banco, ausente em dados mock
  id?: string;
  date: string;
  type: "preventiva" | "corretiva" | "instalação";
  description: string;
  technician: string;
  time: string;
  location: string;
  attendees: Attendee[];
};

export type Equipment = {
  id: string;
  name: string;
  type: string;
  serial: string;
  status: "operacional" | "em_manutencao" | "inativo";
  lastMaintenance: string;
};

export type Report = {
  id: string;
  title: string;
  date: string;
  type: string;
  url: string;
};

export type TicketDataPoint = {
  period: string;
  chamados: number;
};

export type StoreDetail = {
  address: string;
  phone: string;
  manager: string;
  region: string;
  status: "ativo" | "inativo" | "em_reforma";
  maintenanceSchedule: MaintenanceEvent[];
  ticketHistory: TicketDataPoint[];
  equipment: Equipment[];
  reports: Report[];
};

// ── Técnicos reutilizáveis ────────────────────────────────────
export const TECHS: Record<string, Attendee> = {
  joao:    { name: "João Silva",       initials: "JS", color: "#3b82f6" },
  maria:   { name: "Maria Oliveira",   initials: "MO", color: "#ec4899" },
  pedro:   { name: "Pedro Santos",     initials: "PS", color: "#f59e0b" },
  ana:     { name: "Ana Lima",         initials: "AL", color: "#10b981" },
  carlos:  { name: "Carlos Ferreira",  initials: "CF", color: "#8b5cf6" },
  rogerio: { name: "Rogério Alves",    initials: "RA", color: "#f97316" },
};

// Gestores de loja
export const MANAGERS: Record<string, Attendee> = {
  eduardo: { name: "Eduardo Klein",   initials: "EK", color: "#06b6d4" },
  sofia:   { name: "Sofia Lima",      initials: "SL", color: "#84cc16" },
  amanda:  { name: "Amanda Martins",  initials: "AM", color: "#6366f1" },
  jose:    { name: "José Ribeiro",    initials: "JR", color: "#14b8a6" },
  andre:   { name: "André Carvalho",  initials: "AC", color: "#f43f5e" },
  marcos:  { name: "Marcos Santos",   initials: "MS", color: "#a855f7" },
};

export const TECHS_LIST: Attendee[] = Object.values(TECHS);
export const MANAGERS_LIST: Attendee[] = Object.values(MANAGERS);
export const PEOPLE_CATALOG: Attendee[] = [...TECHS_LIST, ...MANAGERS_LIST];

// ── Base de histórico de chamados ─────────────────────────────
const baseTicketHistory: TicketDataPoint[] = [
  { period: "Nov/25", chamados: 4 },
  { period: "Dez/25", chamados: 7 },
  { period: "Jan/26", chamados: 3 },
  { period: "Fev/26", chamados: 9 },
  { period: "Mar/26", chamados: 5 },
  { period: "Abr/26", chamados: 6 },
  { period: "Mai/26", chamados: 2 },
  { period: "Jun/26", chamados: 8 },
  { period: "Jul/26", chamados: 11 },
  { period: "Ago/26", chamados: 4 },
  { period: "Set/26", chamados: 6 },
  { period: "Out/26", chamados: 3 },
];

// ── Equipamentos base ─────────────────────────────────────────
const baseEquipment: Equipment[] = [
  {
    id: "eq-001",
    name: "Ar Condicionado Split 24.000 BTU",
    type: "Climatização",
    serial: "AC-2023-0041",
    status: "operacional",
    lastMaintenance: "15/03/2026",
  },
  {
    id: "eq-002",
    name: "Sistema CFTV – NVR 16 Canais",
    type: "Segurança",
    serial: "NVR-2022-0018",
    status: "em_manutencao",
    lastMaintenance: "01/04/2026",
  },
  {
    id: "eq-003",
    name: "Nobreak 3kVA Senoidal",
    type: "Energia",
    serial: "NB-2021-0093",
    status: "operacional",
    lastMaintenance: "20/02/2026",
  },
  {
    id: "eq-004",
    name: "Terminal PDV – Caixa 01",
    type: "TI",
    serial: "PDV-2024-0011",
    status: "operacional",
    lastMaintenance: "10/04/2026",
  },
  {
    id: "eq-005",
    name: "Terminal PDV – Caixa 02",
    type: "TI",
    serial: "PDV-2024-0012",
    status: "inativo",
    lastMaintenance: "10/04/2026",
  },
  {
    id: "eq-006",
    name: "Gerador a Diesel 15kVA",
    type: "Energia",
    serial: "GE-2020-0005",
    status: "operacional",
    lastMaintenance: "05/01/2026",
  },
];

// ── Relatórios base ───────────────────────────────────────────
const baseReports: Report[] = [
  {
    id: "rep-001",
    title: "Manutenção Preventiva – Outubro/2026",
    date: "31/10/2026",
    type: "Preventiva",
    url: "#",
  },
  {
    id: "rep-002",
    title: "Chamados Técnicos – 3º Trimestre 2026",
    date: "30/09/2026",
    type: "Chamados",
    url: "#",
  },
  {
    id: "rep-003",
    title: "Inventário de Equipamentos – Set/2026",
    date: "30/09/2026",
    type: "Inventário",
    url: "#",
  },
  {
    id: "rep-004",
    title: "Manutenção Corretiva – Ago/2026",
    date: "31/08/2026",
    type: "Corretiva",
    url: "#",
  },
  {
    id: "rep-005",
    title: "Relatório Semestral – 1º Semestre 2026",
    date: "30/06/2026",
    type: "Semestral",
    url: "#",
  },
];

// ── Dados por loja ────────────────────────────────────────────
const storeDetails: Record<string, StoreDetail> = {
  retention: {
    address: "R. Visc. de Inhaúma, 1333 - Maurício de Nassau, Caruaru - PE, 55014-410",
    phone: "(081) 98243-1005",
    manager: "Eduardo Klein",
    region: "Leste",
    status: "ativo",
    maintenanceSchedule: [
      {
        date: "2026-04-28",
        type: "preventiva",
        description: "Inspeção mensal de climatização",
        technician: "João Silva",
        time: "08:00",
        location: "Área de Climatização",
        attendees: [MANAGERS.eduardo, TECHS.joao, TECHS.carlos],
      },
      {
        date: "2026-04-28",
        type: "corretiva",
        description: "Troca de filtros – UTA central",
        technician: "Pedro Santos",
        time: "14:00",
        location: "Sala Técnica – Subsolo",
        attendees: [TECHS.pedro, TECHS.maria],
      },
      {
        date: "2026-05-07",
        type: "preventiva",
        description: "Revisão geral do sistema de climatização",
        technician: "João Silva",
        time: "09:00",
        location: "Área de Climatização",
        attendees: [MANAGERS.eduardo, TECHS.joao, TECHS.carlos],
      },
      {
        date: "2026-05-07",
        type: "corretiva",
        description: "Verificação do painel elétrico principal",
        technician: "Pedro Santos",
        time: "14:30",
        location: "Área Elétrica – Fundos",
        attendees: [TECHS.pedro, TECHS.rogerio],
      },
      {
        date: "2026-05-14",
        type: "instalação",
        description: "Instalação de câmera IP – setor de caixas",
        technician: "Carlos Ferreira",
        time: "10:00",
        location: "Frente de Caixa – Piso 1",
        attendees: [MANAGERS.eduardo, TECHS.carlos, TECHS.ana],
      },
      {
        date: "2026-05-19",
        type: "corretiva",
        description: "Reparo no sistema de câmeras – ala B",
        technician: "Maria Oliveira",
        time: "08:30",
        location: "Ala de Segurança – Piso 2",
        attendees: [TECHS.maria, TECHS.carlos],
      },
      {
        date: "2026-05-22",
        type: "preventiva",
        description: "Manutenção preventiva do nobreak",
        technician: "Pedro Santos",
        time: "13:00",
        location: "Sala de TI",
        attendees: [MANAGERS.eduardo, TECHS.pedro],
      },
      {
        date: "2026-05-28",
        type: "preventiva",
        description: "Vistoria geral pré-inventário",
        technician: "João Silva",
        time: "07:30",
        location: "Toda a loja",
        attendees: [MANAGERS.eduardo, TECHS.joao, TECHS.ana, TECHS.rogerio],
      },
      {
        date: "2026-06-03",
        type: "instalação",
        description: "Instalação de novo sistema de PDV",
        technician: "Ana Lima",
        time: "10:00",
        location: "Frente de Caixa – Piso 1",
        attendees: [MANAGERS.eduardo, TECHS.ana, TECHS.joao],
      },
      {
        date: "2026-06-20",
        type: "preventiva",
        description: "Manutenção preventiva mensal – elétrica",
        technician: "Pedro Santos",
        time: "09:30",
        location: "Área Elétrica",
        attendees: [MANAGERS.eduardo, TECHS.pedro, TECHS.rogerio],
      },
    ],
    ticketHistory: baseTicketHistory,
    equipment: baseEquipment,
    reports: baseReports,
  },

  revenue: {
    address: "Rua Oscar Freire, 900 – Jardins, São Paulo – SP",
    phone: "(11) 97654-3210",
    manager: "Sofia Lima",
    region: "Oeste",
    status: "em_reforma",
    maintenanceSchedule: [
      {
        date: "2026-05-12",
        type: "corretiva",
        description: "Reforma elétrica – quadro geral",
        technician: "Rogério Alves",
        time: "07:00",
        location: "Área Elétrica",
        attendees: [MANAGERS.sofia, TECHS.rogerio, TECHS.pedro],
      },
      {
        date: "2026-05-12",
        type: "instalação",
        description: "Cabeamento estruturado – novo layout",
        technician: "Carlos Ferreira",
        time: "13:00",
        location: "Sala de TI",
        attendees: [TECHS.carlos, TECHS.ana],
      },
      {
        date: "2026-05-28",
        type: "instalação",
        description: "Instalação de ar condicionado – piso 2",
        technician: "Ana Lima",
        time: "08:00",
        location: "Piso 2 – Área Comercial",
        attendees: [MANAGERS.sofia, TECHS.ana, TECHS.joao, TECHS.carlos],
      },
    ],
    ticketHistory: baseTicketHistory.map((d) => ({
      ...d,
      chamados: Math.round(d.chamados * 1.4),
    })),
    equipment: baseEquipment,
    reports: baseReports,
  },

  "active-users": {
    address: "Shopping Morumbi, Av. Roque Petroni Jr. 1089 – São Paulo – SP",
    phone: "(11) 98888-1234",
    manager: "Amanda Martins",
    region: "Norte",
    status: "ativo",
    maintenanceSchedule: [
      {
        date: "2026-05-05",
        type: "preventiva",
        description: "Inspeção preventiva de geradores",
        technician: "Carlos Ferreira",
        time: "07:30",
        location: "Sala de Geradores",
        attendees: [MANAGERS.amanda, TECHS.carlos, TECHS.rogerio],
      },
      {
        date: "2026-05-14",
        type: "preventiva",
        description: "Revisão do sistema de segurança",
        technician: "João Silva",
        time: "09:00",
        location: "Central de Segurança",
        attendees: [MANAGERS.amanda, TECHS.joao],
      },
      {
        date: "2026-06-10",
        type: "corretiva",
        description: "Reparo no sistema de refrigeração",
        technician: "Maria Oliveira",
        time: "11:00",
        location: "Área de Refrigeração",
        attendees: [MANAGERS.amanda, TECHS.maria, TECHS.ana],
      },
    ],
    ticketHistory: baseTicketHistory.map((d) => ({
      ...d,
      chamados: Math.max(1, Math.round(d.chamados * 0.7)),
    })),
    equipment: baseEquipment,
    reports: baseReports,
  },

  "product-sales": {
    address: "Av. das Nações Unidas, 3003 – Barra Funda, São Paulo – SP",
    phone: "(11) 92222-9876",
    manager: "José Ribeiro",
    region: "Sul",
    status: "ativo",
    maintenanceSchedule: [
      {
        date: "2026-05-08",
        type: "preventiva",
        description: "Manutenção preventiva de equipamentos TI",
        technician: "Ana Lima",
        time: "10:00",
        location: "Sala de TI",
        attendees: [MANAGERS.jose, TECHS.ana, TECHS.carlos],
      },
      {
        date: "2026-05-22",
        type: "instalação",
        description: "Instalação câmera adicional – estacionamento",
        technician: "Pedro Santos",
        time: "08:00",
        location: "Estacionamento – Externo",
        attendees: [MANAGERS.jose, TECHS.pedro],
      },
      {
        date: "2026-06-15",
        type: "preventiva",
        description: "Revisão geral anual",
        technician: "João Silva",
        time: "07:00",
        location: "Toda a loja",
        attendees: [MANAGERS.jose, TECHS.joao, TECHS.maria, TECHS.carlos],
      },
    ],
    ticketHistory: baseTicketHistory,
    equipment: baseEquipment,
    reports: baseReports,
  },

  "customer-feedback": {
    address: "Rua da Consolação, 247 – Consolação, São Paulo – SP",
    phone: "(11) 93333-6543",
    manager: "André Carvalho",
    region: "Centro",
    status: "ativo",
    maintenanceSchedule: [
      {
        date: "2026-05-10",
        type: "corretiva",
        description: "Reparo no sistema de alarme",
        technician: "Rogério Alves",
        time: "09:30",
        location: "Central de Alarmes",
        attendees: [MANAGERS.andre, TECHS.rogerio, TECHS.carlos],
      },
      {
        date: "2026-06-05",
        type: "preventiva",
        description: "Manutenção preventiva semestral",
        technician: "Carlos Ferreira",
        time: "08:00",
        location: "Toda a loja",
        attendees: [MANAGERS.andre, TECHS.carlos, TECHS.joao, TECHS.ana],
      },
    ],
    ticketHistory: baseTicketHistory.map((d) => ({
      ...d,
      chamados: Math.max(1, Math.round(d.chamados * 0.9)),
    })),
    equipment: baseEquipment,
    reports: baseReports,
  },

  "marketing-campaign-1": {
    address: "Av. Rebouças, 3970 – Pinheiros, São Paulo – SP",
    phone: "(11) 94444-1111",
    manager: "Marcos Santos",
    region: "Leste",
    status: "ativo",
    maintenanceSchedule: [
      {
        date: "2026-05-06",
        type: "preventiva",
        description: "Revisão do sistema elétrico",
        technician: "Pedro Santos",
        time: "08:30",
        location: "Área Elétrica",
        attendees: [MANAGERS.marcos, TECHS.pedro, TECHS.rogerio],
      },
      {
        date: "2026-06-02",
        type: "instalação",
        description: "Instalação de novo sistema de monitoramento",
        technician: "Ana Lima",
        time: "10:00",
        location: "Central de Segurança",
        attendees: [MANAGERS.marcos, TECHS.ana, TECHS.carlos],
      },
    ],
    ticketHistory: baseTicketHistory,
    equipment: baseEquipment,
    reports: baseReports,
  },

  "marketing-campaign-2": {
    address: "Rua Augusta, 1200 – Consolação, São Paulo – SP",
    phone: "(11) 95555-2222",
    manager: "Marcos Santos",
    region: "Oeste",
    status: "inativo",
    maintenanceSchedule: [],
    ticketHistory: baseTicketHistory.map((d) => ({ ...d, chamados: 0 })),
    equipment: baseEquipment.map((e) => ({ ...e, status: "inativo" as const })),
    reports: baseReports.slice(0, 2),
  },

  "marketing-campaign-3": {
    address: "Al. Santos, 700 – Cerqueira César, São Paulo – SP",
    phone: "(11) 96666-3333",
    manager: "Marcos Santos",
    region: "Norte",
    status: "ativo",
    maintenanceSchedule: [
      {
        date: "2026-05-16",
        type: "preventiva",
        description: "Manutenção preventiva de ar condicionado",
        technician: "João Silva",
        time: "09:00",
        location: "Área de Climatização",
        attendees: [MANAGERS.marcos, TECHS.joao, TECHS.ana],
      },
      {
        date: "2026-06-12",
        type: "corretiva",
        description: "Reparo no sistema de CFTV",
        technician: "Maria Oliveira",
        time: "14:00",
        location: "Ala de Segurança",
        attendees: [MANAGERS.marcos, TECHS.maria, TECHS.carlos],
      },
    ],
    ticketHistory: baseTicketHistory.map((d) => ({
      ...d,
      chamados: Math.round(d.chamados * 1.2),
    })),
    equipment: baseEquipment,
    reports: baseReports,
  },
};

const fallback: StoreDetail = {
  address: "Endereço não cadastrado",
  phone: "—",
  manager: "—",
  region: "—",
  status: "ativo",
  maintenanceSchedule: [],
  ticketHistory: baseTicketHistory,
  equipment: baseEquipment,
  reports: baseReports,
};

export function getStoreDetail(slug: string): StoreDetail {
  return storeDetails[slug] ?? fallback;
}
