import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Icon from '../components/Icon';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [formValid, setFormValid] = useState<boolean>(false);
  const { error, loading, token, login } = useAuth();

  if (token) {
    return <Navigate to="/" />;
  }

  const handleSubmit = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    setFormValid(!!email && !!password && !loading);
  }, [email, password, loading]);

  return (
    <main className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-14 w-auto"
            src="/klabin-normal.svg"
            alt="Klabin"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Faça login na sua conta
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                E-mail
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-brand sm:text-sm sm:leading-6"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-brand sm:text-sm sm:leading-6"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="mt-2 p-3 rounded-md bg-red-500 flex items-center">
              <Icon.ExclamationTriangleIcon className="w-5 h-5 text-white mr-2" />
              <p className="text-sm text-white font-semibold">{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-brand py-2 px-3 text-sm font-semibold text-white hover:bg-brand/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand/30 disabled:bg-brand/60"
              onClick={handleSubmit}
              disabled={!formValid}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon.LockClosedIcon
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </span>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
