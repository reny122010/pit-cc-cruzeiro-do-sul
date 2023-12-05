import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-brand">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Página não encontrada!
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Desculpe, não encontramos a página que você procura.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-brand px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
