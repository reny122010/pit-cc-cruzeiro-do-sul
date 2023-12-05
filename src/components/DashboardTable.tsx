import { Task } from '../entities/Task';
import { generateUID } from '../helpers/id';

interface DashboardTableInput {
  data: Task[];
}

export default function DashboardTable({ data }: DashboardTableInput) {
  const intl = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Recife',
  });

  return (
    <div className="overflow-x-scroll border border-gray-200 rounded-md shadow-md mb-8">
      <div className="min-w-[900px] divide-y divide-gray-200">
        <div className="grid grid-cols-7 gap-1 bg-gray-50">
          <div className="p-3 text-sm font-bold text-left rtl:text-right text-gray-800  whitespace-nowrap">
            Responsável
          </div>

          <div className="col-span-2 p-3 text-sm font-bold text-left rtl:text-right text-gray-800  whitespace-nowrap">
            Tarefa
          </div>

          <div className="p-3 text-sm font-bold text-left rtl:text-right text-gray-800  whitespace-nowrap">
            Duração Total
          </div>

          <div className="p-3 text-sm font-bold text-left rtl:text-right text-gray-800  whitespace-nowrap">
            Data de início
          </div>

          <div className="p-3 text-sm font-bold text-left rtl:text-right text-gray-800  whitespace-nowrap">
            Data de fim
          </div>

          <div className="p-3 text-sm font-bold text-left rtl:text-right text-gray-800  whitespace-nowrap">
            Total realizado
          </div>
        </div>
        <div className="bg-white divide-y divide-gray-200 max-h-60 overflow-y-scroll">
          {data.length ? (
            data.map((task) => (
              //@ts-ignore
              <div className="grid grid-cols-7 gap-1" key={generateUID()}>
                <div className="p-3 text-sm font-normal text-gray-800">
                  {task.responsibleUserId.fullname}
                </div>
                <div className="col-span-2 p-3 text-sm font-normal text-gray-800">
                  {task.title}
                </div>
                <div className="p-3 text-sm font-medium">
                  {task.totalHours}h
                </div>
                <div className="p-3 text-sm">
                  {intl.format(new Date(task.startDate))}
                </div>
                <div className="p-3 text-sm">
                  {intl.format(new Date(task.endDate))}
                </div>
                <div className="p-3 text-sm">{task.totalRealized}%</div>
              </div>
            ))
          ) : (
            <div className="w-full p-5 text-center">Sem dados!</div>
          )}
        </div>
      </div>
    </div>
  );
}
