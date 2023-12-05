import Header from '../components/Header';
import LinkList, { Option } from '../components/LinkList';
import Icon from '../components/Icon';

import { useEffect, useState } from 'react';
import { getArea } from '../services/api';
import Container from '../components/Container';

function ListSkeleton() {
  return (
    <Container>
      <div className="animate-pulse mt-3">
        <div className="w-1/4 h-10 mb-10 bg-slate-300 rounded"></div>
        <div className="w-2/4 h-10 mb-10 bg-slate-300 rounded"></div>
        <div className="w-3/4 h-10 mb-10 bg-slate-300 rounded"></div>
        <div className="w-1/4 h-10 mb-10 bg-slate-300 rounded"></div>
        <div className="w-1/4 h-10 mb-10 bg-slate-300 rounded"></div>
        <div className="w-2/4 h-10 mb-10 bg-slate-300 rounded"></div>
      </div>
    </Container>
  );
}

export default function OccupationArea() {
  const [occupations, setOccupations] = useState<Option[]>([]);

  useEffect(() => {
    getArea().then((occupationArea) => {
      const options: Option[] = occupationArea
        ? occupationArea.map((obj: any) => ({
            name: obj.areaName,
            href: `${obj._id}`,
            icon: Icon['RectangleGroupIcon'],
          }))
        : [];

      setOccupations(options);
    });
  }, []);

  return (
    <main>
      <Header title="Área de atuação" hasBackButton />
      <>
        {occupations.length ? (
          <LinkList options={occupations} />
        ) : (
          <ListSkeleton />
        )}
      </>
    </main>
  );
}
