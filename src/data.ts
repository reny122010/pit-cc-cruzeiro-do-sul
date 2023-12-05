export const homeOptions = [
  {
    name: 'Manutenção/Operação',
    description:
      'Realize apontamentos de progresso nas atividades das mais diversas áreas e especialidades',
    href: 'manutencao',
    icon: 'WrenchScrewdriverIcon',
    roles: [],
  },
  {
    name: 'Segurança',
    description:
      'Aqui você consegue indicar acontecimentos relacionados a segurança',
    href: 'seguranca',
    icon: 'ShieldCheckIcon',
    roles: [],
  },
  {
    name: 'Facilities',
    description: 'Aponte diariamente o que foi usado de facilitadores',
    href: 'facilities',
    icon: 'CpuChipIcon',
    roles: [],
  },
  {
    name: 'Dashboard',
    description: 'Veja o andamento das atividades',
    href: 'dashboard',
    icon: 'WindowIcon',
    roles: ['admin'],
  },
];

export const specialty = [
  {
    name: 'Operação',
    href: 'operacao/tasks',
    icon: 'RectangleGroupIcon',
  },
  {
    name: 'Mecânica',
    href: 'mecanica/tasks',
    icon: 'RectangleGroupIcon',
  },
  {
    name: 'EIA',
    href: 'eia/tasks',
    icon: 'RectangleGroupIcon',
  },
  {
    name: 'Civil',
    href: 'civil/tasks',
    icon: 'RectangleGroupIcon',
  },
  {
    name: 'Projeto',
    href: 'projeto/tasks',
    icon: 'RectangleGroupIcon',
  },
];
