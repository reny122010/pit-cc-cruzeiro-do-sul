import Header from '../components/Header';
import LinkList, { Option } from '../components/LinkList';
import { homeOptions } from '../data';
import Icon from '../components/Icon';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { isAdmin } = useAuth();
  const options: Option[] = homeOptions
    .filter((obj) => (!isAdmin && obj.roles.includes('admin') ? false : true))
    .map((obj) => ({
      ...obj,
      icon: Icon[obj.icon],
    }));

  return (
    <main>
      <Header title="Apontamentos" />
      <LinkList options={options} />
    </main>
  );
}
