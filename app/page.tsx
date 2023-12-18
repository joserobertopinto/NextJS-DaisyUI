'use client'
import { ClientSideTable } from "@/components/ClientSideTable";
import dataPersona from "@/utils/persona";

export default async function page(){
  const personas = await dataPersona();
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">React Table/DaisyUI</h1>
      <ClientSideTable data={personas.personas} paginacion={personas.paginacion}/>
    </div>
  );
};