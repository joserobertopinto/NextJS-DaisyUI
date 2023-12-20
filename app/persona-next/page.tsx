import Pagination from './pagination';
import fetchFilteredPersonas from './persona';
import PersonaTable from './table';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { PersonasTableSkeleton } from '../ui/skeletons';
import Search from './search';

export const metadata: Metadata = {
  title: 'Personas',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const personas = await fetchFilteredPersonas(query, currentPage);
    const data = personas.personas;
    const totalPages = personas.pageCount;
    // const totalPages = await fetchParsonasPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 >Personas</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar por apellido" />
      </div>
      <Suspense key={query + currentPage} fallback={<PersonasTableSkeleton />}>
        <PersonaTable data={data} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}