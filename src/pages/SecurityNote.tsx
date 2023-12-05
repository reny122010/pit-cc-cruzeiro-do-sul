import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import Header from '../components/Header';
import { Item, List } from '../components/List';
import { Note } from '../entities/Note';
import { simpleDateFormat } from '../helpers/date';
import { getSecurityNotes } from '../services/api';
import Icon from '../components/Icon';

function ListSkeleton() {
  return (
    <Container>
      <div className="flex justify-between items-center mb-3">
        <div className="animate-pulse w-28 h-6 bg-slate-300 rounded"></div>
        <div className="animate-pulse w-16 h-10 bg-slate-300 rounded"></div>
      </div>
      <div className="flex justify-between items-center gap-3 mb-3">
        <div className="animate-pulse w-40 h-6 bg-slate-300 rounded"></div>
        <div className="animate-pulse w-16 h-10 bg-slate-300 rounded"></div>
      </div>
      <div className="flex justify-between items-center gap-3 mb-3">
        <div className="animate-pulse w-36 h-6 bg-slate-300 rounded"></div>
        <div className="animate-pulse w-16 h-10 bg-slate-300 rounded"></div>
      </div>
      <div className="flex justify-between items-center gap-3 mb-3">
        <div className="animate-pulse w-64 h-6 bg-slate-300 rounded"></div>
        <div className="animate-pulse w-16 h-10 bg-slate-300 rounded"></div>
      </div>
    </Container>
  );
}

export default function SecurityNote() {
  const [listData, setListData] = useState<Note[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getSecurityNotes(date)
      .then((data) => setListData(data))
      .finally(() => setIsLoading(false));
  }, [date]);

  return (
    <main>
      <Header title="Segurança e Meio Ambiente" hasBackButton>
        <input
          type="date"
          className="rounded-md"
          onChange={(e) => setDate(new Date(e.target.value))}
          defaultValue={simpleDateFormat(date)}
          max={simpleDateFormat(new Date())}
        />
      </Header>
      {isLoading ? (
        <ListSkeleton />
      ) : (
        <Container>
          <List>
            {listData.length ? (
              listData.map((item) => (
                <Item key={item._id}>
                  <div className="flex-grow">
                    <span className="font-semibold">{item.name}</span>:
                    <span className="ml-1">
                      {item.events.reduce(
                        (acc: number, event) => acc + event.amount,
                        0
                      )}
                    </span>
                  </div>
                  <Link
                    className="bg-brand hover:bg-brand/80 text-white py-2 px-4 rounded"
                    to={`${simpleDateFormat(date)}/${item._id}`}
                  >
                    Apontar
                  </Link>
                </Item>
              ))
            ) : (
              <div className="mt-2 p-3  flex items-center justify-center">
                <Icon.ExclamationTriangleIcon className="w-5 h-5 text-gray-900 mr-2" />
                <p className="text-sm text-gray-900 font-semibold">
                  Você não possui especialidades
                </p>
              </div>
            )}
          </List>
        </Container>
      )}
    </main>
  );
}
