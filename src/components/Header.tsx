import { useNavigate } from 'react-router-dom';
import Icon from './Icon';

interface HeaderProps {
  title?: string;
  hasBackButton?: boolean;
  children?: React.ReactNode;
}

export default function Header({
  title,
  hasBackButton,
  children,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          {hasBackButton && (
            <button onClick={() => navigate(-1)} className="pr-3">
              <Icon.ChevronLeftIcon className="w-7 h-7  text-gray-900" />
            </button>
          )}
          {title && (
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h1>
          )}
        </div>
        {children}
      </div>
    </header>
  );
}
