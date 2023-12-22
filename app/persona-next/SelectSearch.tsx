'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function SelectSearch({ placeholder, field, data }: { placeholder: string, field: string, data:[]}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [selectedId, setSelectedId] = useState('');


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
      <select className="select select-bordered w-full max-w-xs placeholder:text-gray-500" value={selectedId} onChange={handleSelectChange}>
        <option value="">{placeholder}</option>
        {data.map(({ id, descripcion }) => (
        <option key={id} value={id}>
          {descripcion}
        </option>
      ))}
      </select>
    </div>
  );
}