'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default async function SelectSearch({ placeholder, field, data }: { placeholder: string, field: string, data:[]}) {
  const searchParams  = useSearchParams();
  const pathname      = usePathname();
  const { replace }   = useRouter();
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    // Obtener el valor de la URL al cargar la página
    const params = new URLSearchParams(searchParams);
    const urlValue = params.get(field);

    // Actualizar el estado con el valor de la URL
    if (urlValue !== null) {
      setSelectedId(urlValue);
    }
  }, []); // Se ejecuta solo al montar el componente

  const handleSelectChange = (event) => {
    const id = event.target.value;
    const params = new URLSearchParams(searchParams);
    setSelectedId(id);

    if (id) {
      params.set(field, id);
    } else {
      params.delete(field);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <select className="select select-bordered w-full max-w-xs placeholder:text-gray-350" value={selectedId} onChange={handleSelectChange}>
        <option className='text-gray-350' value="">{placeholder}</option>
        {data && data.map(({ id, descripcion }) => (
          <option key={id} value={id}>
            {descripcion}
          </option>
        ))}
      </select>
    </div>
  );
}