import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comments from '../components/Comment';
import Container from '../components/Container';
import Header from '../components/Header';
import { Task } from '../entities/Task';
import { getArea, updateTask, cancelTask } from '../services/api';

function TaskSkeleton() {
  return (
    <Container>
      <div className="animate-pulse bg-white rounded shadow p-4">
        <div className="w-1/4 h-3 mb-3 bg-slate-300 rounded"></div>
        <div className="w-2/3 h-5 mb-1 bg-slate-300 rounded"></div>
        <div className="w-2/4 h-5 mb-3 bg-slate-300 rounded"></div>
        <div className="w-full h-3 bg-slate-300 rounded"></div>
      </div>
    </Container>
  );
}

export default function TaskDetail() {
  const [percent, setPercent] = useState<number>(0);
  const [task, setTask] = useState<Task>({} as Task);
  const [isLoading, setIsLoading] = useState(true);
  const { area: areaId, speciality: specialityId, task: taskId } = useParams();

  function updateTaskData(totalRealized: number) {
    setIsLoading(true);
    updateTask(
      {
        areaId: areaId as string,
        specialityId: specialityId as string,
        taskId: taskId as string,
      },
      { ...task, totalRealized }
    ).then(fetchTaskData);
  }

  function cancelTaskData() {
    setIsLoading(true);
    cancelTask({
      areaId: areaId as string,
      specialityId: specialityId as string,
      taskId: taskId as string,
    }).then(fetchTaskData);
  }
  function fetchTaskData() {
    setIsLoading(true);
    getArea()
      .then((occupationArea) => {
        const thisOccupationArea = occupationArea.find(
          (occupation: any) => occupation._id === areaId
        );

        if (thisOccupationArea) {
          const listOfTasks = thisOccupationArea.specialities.find(
            (speciality: any) => speciality._id === specialityId
          ).tasks;

          if (listOfTasks) {
            listOfTasks.find((item: any) => item._id === taskId);
            const searchedTask =
              listOfTasks.find((item: any) => item._id === taskId) ?? undefined;

            if (searchedTask) {
              setTask(searchedTask);
              setPercent(searchedTask?.totalRealized ?? 0);
            }
          }
        }
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(fetchTaskData, []);

  return (
    <main>
      <Header hasBackButton>
        <div className="flex justify-end">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold text-sm py-2 px-4 mr-2 rounded ${
              isLoading || task.isCanceled
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : ''
            }`}
            type="button"
            disabled={isLoading || task.isCanceled}
            onClick={() => updateTaskData(percent)}
          >
            Atualizar
          </button>
          <button
            className={` text-white font-semibold text-sm py-2 px-4 mr-2 rounded ${
              isLoading || task.isCanceled
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-700'
            }`}
            type="button"
            disabled={isLoading || task.isCanceled}
            onClick={() => updateTaskData(100)}
          >
            Concluir
          </button>
          <button
            className={` text-white font-semibold text-sm py-2 px-4 rounded ${
              isLoading || task.isCanceled
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-700'
            }`}
            type="button"
            disabled={isLoading || task.isCanceled}
            onClick={() => cancelTaskData()}
          >
            Cancelar
          </button>
        </div>
      </Header>
      {isLoading ? (
        <TaskSkeleton />
      ) : (
        <Container>
          <div className="bg-white rounded shadow p-4">
            {(task.local || task.order || task.isCanceled) && (
              <p
                className={`mb-3 font-semibold text-xs ${
                  task.isCanceled ? 'text-red-500' : ''
                }`}
              >
                # {task.local} - {task.order}{' '}
                {task.isCanceled ? 'CANCELADA' : ''}
              </p>
            )}
            <p className="mb-4 font-semibold text-gray-900">{task?.title}</p>
            <input
              type="range"
              className="w-full"
              disabled={isLoading || task.isCanceled}
              value={percent}
              onChange={(e) => setPercent(+e.target.value)}
            />
            <p className="font-semibold">{percent}%</p>
          </div>

          <Comments
            taskId={taskId ?? ''}
            specialityId={specialityId ?? ''}
            areaId={areaId ?? ''}
          />
        </Container>
      )}
    </main>
  );
}
