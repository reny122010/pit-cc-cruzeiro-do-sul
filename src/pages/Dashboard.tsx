import { useEffect, useId, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Container from '../components/Container';
import Header from '../components/Header';
import { getDashboardData } from '../services/api';
import DashboardTable from '../components/DashboardTable';
import { Task } from '../entities/Task';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { generateUID } from '../helpers/id';

function Skeleton() {
  return (
    <Container>
      <div className="animate-pulse mt-3 shadow-md rounded border-gray-100 border mb-8 p-4">
        <div className="w-full h-60 mb-4 bg-slate-300 rounded"></div>
      </div>
      <div className="animate-pulse mt-3 shadow-md rounded border-gray-100 border mb-8 p-4">
        <div className="w-full h-60 mb-4 bg-slate-300 rounded"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="h-60 bg-slate-300 rounded"></div>
          <div className="h-60 bg-slate-300 rounded"></div>
          <div className="h-60 bg-slate-300 rounded"></div>
        </div>
      </div>
      <div className="animate-pulse mt-3 shadow-md rounded border-gray-100 border mb-8 p-4">
        <div className="w-full h-60 mb-4 bg-slate-300 rounded"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="h-60 bg-slate-300 rounded"></div>
          <div className="h-60 bg-slate-300 rounded"></div>
          <div className="h-60 bg-slate-300 rounded"></div>
        </div>
      </div>
    </Container>
  );
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Factory {
  title: string;
  tasks: Task[];
}

interface Area {
  area: string;
  specialty: string;
  amountOfResolvedTasks: number;
  amountOfTasks: number;
  amountOfCanceledTasks: number;
  amountOfShouldResolvedTasks: number;
  tasks: Task[];
}
interface DashboardData {
  factory: {
    completed: number;
    expected: number;
    groups: Factory[];
  };
  byArea: Area[];
  byAreaRaw: any[];
  byUser: {
    byUser: any[];
    operationCompleted: string;
    operationShouldCompleted: string;
    maintenanceCompleted: string;
    maintenanceShouldCompleted: string;
    projectCompleted: string;
    projectShouldCompleted: string;
  };
}

const getChartData = (data: {
  title?: string;
  completed: number;
  expected: number;
  horizontal?: boolean;
  fontsize?: number;
}) => ({
  options: {
    indexAxis: data.horizontal ? ('y' as const) : ('x' as const),
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: data.title,
        font: {
          size: data.fontsize || 12,
        },
      },
    },
  },
  data: {
    labels: [''],
    datasets: [
      {
        label: `Concluído ${data.completed}%`,
        data: [data.completed],
        backgroundColor: 'rgb(4, 164, 84, 0.8)',
      },
      {
        label: `Esperado ${data.expected}%`,
        data: [data.expected, 100],
        backgroundColor: 'rgba(255, 12, 12, 0.5)',
      },
    ],
  },
});

function getByAreaPercents(amounts: {
  resolvedTasks: number;
  tasks: number;
  canceledTasks: number;
  shouldResolvedTasks: number;
}) {
  const { resolvedTasks, tasks, canceledTasks, shouldResolvedTasks } = amounts;
  const completed = +(
    resolvedTasks !== 0
      ? (resolvedTasks / (tasks - canceledTasks)) * 100
      : tasks - canceledTasks === 0
      ? 100
      : 0
  ).toFixed(2);
  const expected = +(
    shouldResolvedTasks !== 0
      ? (shouldResolvedTasks / (tasks - canceledTasks)) * 100
      : 0
  ).toFixed(2);
  return { completed, expected };
}

const getAmountsDataByArea = (data: Area[]) =>
  data.reduce(
    (obj, current) => {
      return {
        resolvedTasks: obj.resolvedTasks + current.amountOfResolvedTasks,
        tasks: obj.tasks + current.amountOfTasks,
        canceledTasks: obj.canceledTasks + current.amountOfCanceledTasks,
        shouldResolvedTasks:
          obj.shouldResolvedTasks + current.amountOfShouldResolvedTasks,
      };
    },
    {
      resolvedTasks: 0,
      tasks: 0,
      canceledTasks: 0,
      shouldResolvedTasks: 0,
    }
  );

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>();
  const { isAdmin } = useAuth();
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  const titles = {
    resolvedTasks: 'Tarefas concluídas',
    canceledTasks: 'Tarefas canceladas',
    inProgressTasks: 'Tarefas em andamento',
    taskShouldResolvedTasks: 'Tarefas que deveriam estar finalizadas',
  };
  useEffect(() => {
    getDashboardData().then((data) => {
      return setData({
        factory: {
          completed: data.factory.percentageCompletedTask,
          expected: data.factory.percentageShouldCompletedTask,
          groups: Object.entries(data.factory.tasks).map(([key, tasks]) => {
            const atualTasks =
              key === 'taskShouldResolvedTasks'
                ? // @ts-ignore: Unreachable code error
                  tasks.filter((task) => task.totalRealized !== 100)
                : tasks;
            return {
              tasks: atualTasks,
              // @ts-ignore: Unreachable code error
              title: titles[key],
            } as Factory;
          }),
        },
        byArea: Object.entries(data.byArea)
          .map(([, obj]) => obj as Area)
          .flat(),
        byAreaRaw: Object.entries(data.byArea).map(([title, specialities]) => ({
          title,
          specialities,
        })),
        byUser: data.byUser,
      });
    });
  }, []);
  return (
    <main>
      <Header title="Dashboard" hasBackButton={true} />
      {data ? (
        <Container>
          <div className="w-full h-64 shadow-md rounded-md p-3 border-gray-100 border">
            <Bar
              {...getChartData({
                title: 'Fábrica',
                horizontal: true,
                fontsize: 22,
                completed: data.factory.completed,
                expected: data.factory.expected,
              })}
            />
          </div>
          <hr className="my-8" />
          {data.byAreaRaw.map(({ title, specialities }, i) => (
            <section
              key={generateUID()}
              className="shadow-md rounded border-gray-100 border mb-8"
            >
              <div className="w-full h-64 p-3 mb-4">
                <Bar
                  {...getChartData({
                    title,
                    horizontal: true,
                    fontsize: 22,
                    ...getByAreaPercents(getAmountsDataByArea(specialities)),
                  })}
                />
              </div>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                key={generateUID()}
              >
                {specialities.map((obj: any) => (
                  <div className="w-full h-64 p-3" key={generateUID()}>
                    <Bar
                      {...getChartData({
                        title: obj.specialty,
                        expected: obj.percentageShouldCompletedTask,
                        completed: obj.percentageCompletedTask,
                      })}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section className="shadow-md rounded border-gray-100 border mb-8">
            <h2 className="text-[#666] text-[22px] text-center mb-4 font-bold p-4">
              Estatísticas por Pessoa
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.byUser.byUser.map((obj: any) => (
                <div className="w-full h-64 p-3" key={generateUID()}>
                  <Bar
                    {...getChartData({
                      title: obj.fullname,
                      fontsize: 16,
                      expected: obj.percentageShouldCompletedTask,
                      completed: obj.percentageCompletedTask,
                    })}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="shadow-md rounded border-gray-100 border mb-8">
            <h2 className="text-[#666] text-[22px] text-center mb-4 font-bold p-4">
              Estatísticas por grupo
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="w-full h-64 p-3" key={generateUID()}>
                <Bar
                  {...getChartData({
                    title: 'Operação',
                    fontsize: 16,
                    expected: Number(data.byUser.operationShouldCompleted),
                    completed: Number(data.byUser.operationCompleted),
                  })}
                />
              </div>
              <div className="w-full h-64 p-3" key={generateUID()}>
                <Bar
                  {...getChartData({
                    title: 'Manutenção',
                    fontsize: 16,
                    expected: Number(data.byUser.maintenanceShouldCompleted),
                    completed: Number(data.byUser.maintenanceCompleted),
                  })}
                />
              </div>
              <div className="w-full h-64 p-3" key={generateUID()}>
                <Bar
                  {...getChartData({
                    title: 'Projeto',
                    fontsize: 16,
                    expected: Number(data.byUser.projectShouldCompleted),
                    completed: Number(data.byUser.projectCompleted),
                  })}
                />
              </div>
            </div>
          </section>

          <h1 className="text-3xl mb-8">Fábrica</h1>
          {data.factory.groups.map(({ title, tasks }, i) => (
            <div key={generateUID()}>
              <h2 className="text-2xl mb-3">{title}</h2>
              <DashboardTable data={tasks} />
            </div>
          ))}

          <h1 className="text-3xl my-8">Por Área</h1>

          {data.byArea.map((obj, i) => (
            <div key={generateUID()}>
              <h2 className="text-2xl mb-3">
                {obj.area} - {obj.specialty}
              </h2>
              <DashboardTable data={obj.tasks} />
            </div>
          ))}
        </Container>
      ) : (
        <Skeleton />
      )}
    </main>
  );
}
