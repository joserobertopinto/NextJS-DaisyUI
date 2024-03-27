'use client'
import { CalendarDaysIcon, XCircleIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const DatePickerComponent = (field: string, minDate: string, maxDate: string) => {
    const searchParams  = useSearchParams();
    const pathname      = usePathname();
    const { replace }   = useRouter();
    const today         = new Date();

    const defaultMinDate = minDate ? new Date(minDate) : new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
    const defaultMaxDate = maxDate ? new Date(maxDate) : new Date(today.getFullYear() + 10, today.getMonth(), today.getDate());
    
    // Estado para la fecha seleccionada
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        // Obtener la fecha de la URL al cargar la página
        const params = new URLSearchParams(searchParams);
        const urlDate = params.get(field.field);
        // Actualizar el estado con la fecha de la URL
        if (urlDate !== null) {
            setSelectedDate(new Date(urlDate));
        }
    }, []); // Se ejecuta solo al montar el componente

    // Manejar cambios en la fecha seleccionada
    const handleDateChange = (date) => {
        // Actualizar el estado con la nueva fecha
        setSelectedDate(date);
        
        // Actualizar la URL con la nueva fecha
        const params = new URLSearchParams(searchParams);
        params.set(field.field, date.toISOString());
        replace(`${pathname}?${params.toString()}`);
    };

    // Limpiar la fecha seleccionada
    const clearDate = () => {
        setSelectedDate(null);
        // Actualizar la URL con la fecha vacía
        const params = new URLSearchParams(searchParams);
        params.delete(field.field);
        replace(`${pathname}?${params.toString()}`);
    };

    const CustomInput = ({ value, onClick }) => (
        <>
        <input
            type="text"
            value={value}
            onClick={onClick}
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-gray-600 text-sm outline-2 placeholder:text-gray-350"
            placeholder="Selecciona nacimiento"
            readOnly // Configura el input como solo lectura
        />
        <CalendarDaysIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        {value &&(
        <button
            className="absolute top-0 right-0 mt-1 mr-2"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick(clearDate()) // Para evitar que el clic en el botón active el clic en el input
            }}
        >
        <XCircleIcon className="h-[18px] w-[18px] text-gray-500"/>
        </button>
    )}
        </>
    );

    return (
        <div>
        <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy" // Formato de la fecha
            customInput={<CustomInput value={selectedDate}/>}
            showYearDropdown
            // scrollableYearDropdown
            minDate={defaultMinDate}
            maxDate={defaultMaxDate}        
        />
        </div>
    );
};

export default DatePickerComponent;
