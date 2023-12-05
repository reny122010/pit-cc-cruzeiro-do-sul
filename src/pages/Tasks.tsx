import { useCallback, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Task from '../components/Task';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getArea } from '../services/api';
import Header from '../components/Header';
import Container from '../components/Container';

function ListSkeleton() {
  return (
    <Container>
      <div className="animate-pulse flex flex-col mb-4 p-3 bg-white rounded shadow">
        <div className="w-1/3 h-3 mb-3 bg-slate-300 rounded"></div>
        <div className="w-2/3 h-4 mb-2 bg-slate-300 rounded"></div>
        <div className="w-2/4 h-4 mb-4 bg-slate-300 rounded"></div>
        <div className="w-2/4 h-3 mb-2 bg-slate-300 rounded"></div>
        <div className="w-1/3 h-3 mb-2 bg-slate-300 rounded"></div>
      </div>
      <div className="animate-pulse flex flex-col mb-4 p-3 bg-white rounded shadow">
        <div className="w-1/3 h-3 mb-3 bg-slate-300 rounded"></div>
        <div className="w-2/3 h-4 mb-2 bg-slate-300 rounded"></div>
        <div className="w-2/4 h-4 mb-4 bg-slate-300 rounded"></div>
        <div className="w-2/4 h-3 mb-2 bg-slate-300 rounded"></div>
        <div className="w-1/3 h-3 mb-2 bg-slate-300 rounded"></div>
      </div>
      <div className="animate-pulse flex flex-col mb-4 p-3 bg-white rounded shadow">
        <div className="w-1/3 h-3 mb-3 bg-slate-300 rounded"></div>
        <div className="w-2/3 h-4 mb-2 bg-slate-300 rounded"></div>
        <div className="w-2/4 h-4 mb-4 bg-slate-300 rounded"></div>
        <div className="w-2/4 h-3 mb-2 bg-slate-300 rounded"></div>
        <div className="w-1/3 h-3 mb-2 bg-slate-300 rounded"></div>
      </div>
    </Container>
  );
}

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const { area, speciality: paramsSpeciality } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const internalGetArea = (q = null) => {
    getArea(q)
      .then((occupationArea) => {
        const thisOccupationArea = occupationArea.find(
          (occupation: any) => occupation._id === area
        );

        if (thisOccupationArea) {
          setTasks(
            thisOccupationArea.specialities.find(
              (speciality: any) => speciality._id === paramsSpeciality
            ).tasks
          );
        }
      })
      .finally(() => setIsLoading(false));
  };

  const debounce = (func: any, delay: any) => {
    let timeoutId: number;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // eslint-disable-next-line
        // @ts-ignore
        func.apply(this, args);
      }, delay);
    };
  };

  const handleInputChange = useCallback(
    debounce((event: any) => {
      // Do something with the input value, e.g. update state
      if (event) {
        internalGetArea(event?.target?.value);
      }
    }, 500),
    []
  );

  useEffect(() => {
    internalGetArea();
    setIsLoading(true);
  }, []);

  return (
    <main>
      <Header hasBackButton>
        <div className="relative shadow-sm w-full ml-3">
          <div className="pointer-events-none absolute h-full flex items-center pl-3">
            <Icon.MagnifyingGlassIcon
              className="h-4 w-4 text-black"
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            className="block mx-auto w-full rounded-md border-0 p-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand sm:text-sm sm:leading-6"
            placeholder="Pesquisa por tarefa, ordem ou local"
            onChange={handleInputChange}
          />
        </div>
      </Header>
      {isLoading ? (
        <ListSkeleton />
      ) : (
        <Container>
          <section className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {tasks.length ? (
              tasks.map((task: any) => (
                <Link to={task._id} key={task._id}>
                  <Task data={task} />
                </Link>
              ))
            ) : (
              <div className="mt-2 p-3  flex items-center justify-center">
                <Icon.ExclamationTriangleIcon className="w-5 h-5 text-gray-900 mr-2" />
                <p className="text-sm text-gray-900 font-semibold">
                  Você não possui tarefas
                </p>
              </div>
            )}
          </section>
        </Container>
      )}
    </main>
  );
}
