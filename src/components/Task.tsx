import { Task as TaskInterface } from '../entities/Task';
import { useAuth } from '../hooks/useAuth';

function feedbackCSSClass(
  startDate: Date,
  endDate: Date,
  totalPercentRealized: number
): string {
  const today = new Date();
  if (endDate < today && totalPercentRealized < 100) {
    return 'text-red-500';
  }
  if (startDate < today && totalPercentRealized === 0) {
    // talvez aqui a conparação deva ser startDate < today && totalPercentRealized < 100
    return 'text-orange-400';
  }

  return 'text-brand';
}

function calcElapsedPercentage(startDate: Date, endDate: Date): number {
  const now = new Date();
  if (startDate > now) return 0;
  if (endDate < now) return 100;
  const totalDuration = (endDate.getTime() - startDate.getTime()) / 3600000;
  const difference = (now.getTime() - startDate.getTime()) / 3600000;
  const elapsedPercentage = (difference / totalDuration) * 100;
  return +elapsedPercentage.toFixed();
}

export default function Task({ data }: { data: TaskInterface }) {
  const { isAdmin } = useAuth();
  const intl = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'America/Recife',
  });
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);

  const elapsedPercentage = calcElapsedPercentage(startDate, endDate);

  return (
    <div className={`mx-auto p-6 pt-4 shadow-md rounded-md`}>
      {(data.local || data.order || data.isCanceled) && (
        <p
          className={`mb-3 font-semibold text-xs ${
            data.isCanceled ? 'text-red-500' : ''
          }`}
        >
          # {data.local} - {data.order} {data.isCanceled ? 'CANCELADA' : ''}
        </p>
      )}

      <p className="mb-2 font-semibold text-gray-900">{data.title}</p>
      <div className="mt-2">
        <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
          <li
            className={
              elapsedPercentage > data.totalRealized
                ? 'text-red-500'
                : 'text-brand'
            }
          >
            <span>
              Deveria ter realizado <strong>{elapsedPercentage}%</strong> de um
              total de <strong>{data.totalHours}h</strong> Já realizou{' '}
              <strong>{data.totalRealized}%</strong>.
            </span>
          </li>

          <li
            className={feedbackCSSClass(startDate, endDate, data.totalRealized)}
          >
            Planejado:{' '}
            <span className="font-semibold">{intl.format(startDate)}</span> até{' '}
            <span className="font-semibold">{intl.format(endDate)}</span>
          </li>
        </ul>
        {isAdmin && (
          <p className="mt-3 text-sm text-gray-500">
            Responsável: {data.responsibleUserId.fullname}
          </p>
        )}
      </div>
    </div>
  );
}
