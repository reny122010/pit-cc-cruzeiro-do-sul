import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="bg-brand shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link to={'/'}>
                <img
                  className="block h-8 w-auto lg:hidden"
                  src="/klabin.svg"
                  alt="Klabin"
                />
                <img
                  className="hidden h-8 w-auto lg:block"
                  src="/klabin.svg"
                  alt="Klabin"
                />
              </Link>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="focus:outline-0 rounded-sm p-1 sm:text-white/70 text-white hover:text-white flex items-center"
              onClick={() => logout()}
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6 mr-1" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
