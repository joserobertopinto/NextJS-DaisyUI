import { createColumnHelper } from "@tanstack/react-table";
import { Persona } from "@/types/Persona";
import { format, parse } from "date-fns";
import SelectSearch from "./SelectSearch";
import Search from "./search";

const columnHelper = createColumnHelper<Persona>();

export const personaColumnDefs = [
  columnHelper.accessor((row) => row.apellido, {
    id: "apellido",
    cell: (info) => info.getValue(),
    header: (info) => 
    <>
      <span>Apellido</span>
        <Search placeholder="Apellido..." field = "apellido"/>
    </>,
  }),
  columnHelper.accessor((row) => row.nombre, {
    id: "nombre",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () =>     <>
    <span>Nombre</span>
      <Search placeholder="Nombre..." field = "nombre"/>
  </>,
  }),
  columnHelper.accessor((row) => row.fecha_nacimiento, {
    id: "fecha_nacimiento",
    cell: ( info ) => {
      if(info.getValue()){
        // Cambio fomato de fecha '20231222' > '22/12/2023'
        const parsedDate = parse(info.getValue(), 'yyyyMMdd', new Date());
        const formattedDate = format(parsedDate, 'dd/MM/yyyy');
        return <span>{formattedDate}</span>;
      }
    },
    header: () => <span>Fecha de Nacimiento</span>,
  }),
  columnHelper.accessor((row) => row.nro_documento, {
    id: "numero",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () =>     
    <>
    <span>Documento</span>
      <Search placeholder="Documento" field = "documento"/>
    </>,
  }),
  columnHelper.accessor((row) => row.sexo, {
    id: "id_sexo",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => 
    <>
      <span>Sexo</span>
        <SelectSearch placeholder='todos...' field = "id_sexo" data = {[
          {'id':'07adf729-a09a-4354-8400-c882f3b9b7e1', 'descripcion':'MASCULINO'},
          {'id':'e9cef566-1f32-4a43-b58e-a27ef80c8aeb', 'descripcion':'FEMENINO'},
          {'id':'ab1bd966-8be9-4aa8-882b-9379593f5a08', 'descripcion':'NO CORRESPONDE'}
        ]}/>
    </>,
  }),
];
