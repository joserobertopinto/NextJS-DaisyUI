import Pagination from './pagination';
import fetchFilteredPersonas from './persona';
import PersonaTable from './table';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { PersonasTableSkeleton } from '../ui/skeletons';
import fetchSexo from './sexo';

export const metadata: Metadata = {
  title: 'Personas',
};

export default async function Page({
  searchParams,
}: {
  searchParams?:  string;
}) {
  const personas = await fetchFilteredPersonas(searchParams);
  const data = personas.personas;
  const totalPages = personas.pageCount;
  
  //datos utilizados para los filtros
  const sexo = await fetchSexo('');
  const dataSexo = sexo.sexos;
  const dataColumns ={'sexo':dataSexo};
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 >Personas</h1>
      </div>
      <Suspense key={searchParams} fallback={<PersonasTableSkeleton />}>
        <PersonaTable data={data} dataFilterColumns={dataColumns}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}