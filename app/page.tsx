//------PRUEBO SI DAISY NO ROMPE
// export default function Home() {
//   return (
//     <>
//       <button className="btn btn-primary">Hello daisyUI!</button>
//     </>
//   )
// }


import ClientSideTable from "../components/ClientSideTable";

export default function page(){
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">Personas con React Table</h1>
      <ClientSideTable />
    </div>
  );
};