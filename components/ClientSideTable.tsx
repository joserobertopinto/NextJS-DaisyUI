'use client'
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import React from "react";
import { userColumnDefs } from "./UserColumnDefs";
import { TablePagination } from "./TablePagination";


interface DataTableProps<TData> {
  data: TData[];
  paginacion: [];
}

export function ClientSideTable<TData>({data, paginacion}: DataTableProps<TData>) {
  
  function setUrlPaginator(params: string) {
    const baseUrl = "http://172.16.21.135:3000/personas";
    const url = `${baseUrl}?${params}`;
    return url;
  }

  const table = useReactTable({
    columns: userColumnDefs,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
    nextPage: setUrlPaginator(paginacion.links.next),
    previousPage: setUrlPaginator(paginacion.links.next),
    state: {
      pagination: {
        pageIndex:  paginacion.paginado.currentPage,
        pageSize:   paginacion.paginado.perPage,
        totalCount: paginacion.paginado.totalCount.toLocaleString(),
        // first: paginacion.links.first,
        // prev: paginacion.links.prev,
        // next: paginacion.links.next,
        // last: paginacion.links.last
      },
    },
    manualPagination: true,
    pageCount: paginacion.paginado.pageCount,
  });

  const headers = table.getFlatHeaders();
  const rows = table.getRowModel().rows;

  return (
    <div className="overflow-x-auto h-100">
      <table className="table table-zebra my-4 w-full table-pin-rows">
        <thead>
          <tr>
            {headers.map((header) => {
              return (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <span>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
            {rows.map((row) => (
                <tr key={row.id} >
                {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
                </tr>
            ))}
        </tbody>
        </table>
        <TablePagination table = {table}/>
    </div>
  );
};