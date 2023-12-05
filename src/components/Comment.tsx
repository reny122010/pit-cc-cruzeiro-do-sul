import { useEffect, useState } from 'react';
import { Comment } from '../entities/Comment';
import { createTaskComment, getArea } from '../services/api';
import Container from './Container';
import Icon from './Icon';

interface CommentProps {
  taskId: string;
  specialityId: string;
  areaId: string;
}
function CommentsSkeleton() {
  return (
    <div className="animate-pulse pt-4">
      <div className="w-1/6 h-3 mb-2 bg-slate-300 rounded"></div>
      <div className="w-2/3 h-5 mb-4 bg-slate-300 rounded"></div>
      <div className="w-1/6 h-3 mb-2 bg-slate-300 rounded"></div>
      <div className="w-2/5 h-5 mb-4 bg-slate-300 rounded"></div>
      <div className="w-1/6 h-3 mb-2 bg-slate-300 rounded"></div>
      <div className="w-3/5 h-5 mb-4 bg-slate-300 rounded"></div>
    </div>
  );
}

export default function Comments({
  taskId,
  specialityId,
  areaId,
}: CommentProps) {
  const [text, setText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePostComment = () => {
    setText('');
    createTaskComment({ taskId, specialityId, areaId }, text).then(
      fetchTaskData
    );
  };

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
              setComments(searchedTask.comments);
            }
          }
        }
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(fetchTaskData, []);

  return (
    <div>
      <div className="mb-4 mt-4">
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor="comment"
        >
          Comentário:
        </label>
        <div className="mt-2">
          <textarea
            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand sm:py-1.5 sm:text-sm sm:leading-6"
            id="comment"
            placeholder="Insira um comentário"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>
      <div className="flex justify-end mb-4">
        {' '}
        <button
          className="bg-brand hover:bg-brand/60 text-white font-semibold text-sm py-2 px-4 rounded "
          onClick={handlePostComment}
          disabled={isLoading}
        >
          Publicar comentário
        </button>
      </div>
      <hr />
      {isLoading ? (
        <CommentsSkeleton />
      ) : (
        <div className="mt-4">
          <ul className="text-sm">
            {comments.map((comment) => (
              <li key={comment._id} className="mb-5">
                <div className="flex gap-1 mb-1">
                  <Icon.CalendarDaysIcon className="h-4 w-4 text-gray-800" />
                  <p className="text-xs text-gray-800">
                    {new Date(comment.timestamp).toLocaleString()} -{' '}
                    {comment.userId.fullname}
                  </p>
                </div>
                <p>{comment.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
