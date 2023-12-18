// export default function TablePagination(){
    // return (<>
    //     <div className="join">
    //     <input className="join-item btn btn-square" type="radio" name="options" aria-label="1" checked />
    //     <input className="join-item btn btn-square" type="radio" name="options" aria-label="2" />
    //     <input className="join-item btn btn-square" type="radio" name="options" aria-label="3" />
    //     <input className="join-item btn btn-square" type="radio" name="options" aria-label="4" />
    //     </div>
    // </>);
// }

import { Table } from "@tanstack/react-table"
import BotonPaginacion from "./BotonPaginacion";
  
interface DataTablePaginationProps<TData> {
    table: Table<TData>
}
  
  export function TablePagination<TData>({
    table,
  }: DataTablePaginationProps<TData>) {
    return (
        <>
        <div className="float-right">
            {/* Mostrando 1-20 de 370.589 elementos.*/}
            Mostrando {table.getState().pagination.pageIndex } {"-"}
            { table.getState().pagination.pageIndex * table.getState().pagination.pageSize }  de {" "}
            { table.getState().pagination.totalCount } elementos.
        </div>
        <div className="float-left">
            < BotonPaginacion table = {table}/>
        </div>
        </>
    )
  }
  