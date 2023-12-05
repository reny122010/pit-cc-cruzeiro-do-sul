import { List } from '../components/List';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function SimpleNote() {
  const { pathname } = useLocation();
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());

  const simpleDateNow = new Date().toISOString().split('T')[0];

  let headerTitle = 'Facilities';
  let path = 'facilities';

  if (pathname === '/seguranca') {
    headerTitle = 'Segurança';
    path = 'securities';
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(event.target.value));
  };

  async function fetchData() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/${path}/${date.toISOString().split('T')[0]}`
      );
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const data = await response.json();
      console.log(data);
      setListData(data[path]);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    amount: Number,
    itemId: string
  ) => {
    event.preventDefault();
    // send post request with date and amount data

    try {
      const response = await fetch(`${API_URL}/${path}/${itemId}/events`, {
        method: 'POST',
        body: JSON.stringify({
          date: date.toISOString().substr(0, 10),
          amount,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Request failed');
      } else {
        fetchData();
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [path, date]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {headerTitle}
          </h1>
          <input
            type="date"
            className="rounded-md"
            onChange={handleDateChange}
            defaultValue={simpleDateNow}
            max={simpleDateNow}
          />
        </div>
      </header>
      <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          // eslint-disable-next-line
          // @ts-ignore
          <List items={listData} handleFormSubmit={handleFormSubmit} />
        )}
      </div>
    </main>
  );
}
