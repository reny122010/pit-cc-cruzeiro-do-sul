import Header from '../components/Header';
import Icon from '../components/Icon';
import LinkList, { Option } from '../components/LinkList';
import { useParams } from 'react-router-dom';
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

export default function Speciality() {
  const [specialities, setSpecialities] = useState<Option[]>([]);
  const { area } = useParams();

  useEffect(() => {
    getArea().then((occupationArea) => {
      const thisOccupationArea = occupationArea.find(
        (occupation: any) => occupation._id === area
      );

      setSpecialities(
        thisOccupationArea && thisOccupationArea.specialities
          ? thisOccupationArea.specialities
              .filter((obj: any) => obj.tasks.length)
              .map((obj: any) => ({
                name: obj.specialityName,
                href: `${obj._id}/tasks`,
                icon: Icon['RectangleGroupIcon'],
              }))
          : []
      );
    });
  }, []);

  return (
    <main>
      <Header title="Especialidade" hasBackButton />
      {specialities.length ? (
        <LinkList options={specialities} />
      ) : (
        <ListSkeleton />
      )}
    </main>
  );
}
