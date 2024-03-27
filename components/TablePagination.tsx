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
  