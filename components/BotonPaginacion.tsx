import { useState } from "react";
import { Table } from "@tanstack/react-table"
// import { useRouter } from 'next/router';

interface BotonPaginationProps<TData> {
    table: Table<TData>
}

export default function BotonPaginacion<TData>({
    table
  }: BotonPaginationProps<TData>){

    // const router = useRouter();
    const perPage   = (table.getState().pagination.pageSize);//por paginas
    const totalPages   = (table.getState().pagination.totalCount)/(perPage);
    const [currentPage, setCurrentPage] = useState<number>(1); // Página actual
    
    const handleChange = (pageNumber:number) => {
        setCurrentPage(pageNumber);
        const url = `/persona/api/v1/personas?expand=documentos&page=${pageNumber}&per-page=${perPage}`;
        // router.push(url);
    };

    const paginationButtons = Array.from({ length: totalPages }, (_, index) => index + 1);
    
    return (
        <div className="join">
        {
        paginationButtons.map((pageNumber) => (
            <button
                key={pageNumber}
                className={`join-item btn ${pageNumber === currentPage ? 'btn-active' : ''}`}
                onClick={() => handleChange(pageNumber)}
                disabled={pageNumber === currentPage}
            >
                {pageNumber}
            </button>
            ))
        }
      </div>
    );
}