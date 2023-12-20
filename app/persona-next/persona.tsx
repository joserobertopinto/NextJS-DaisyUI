const ITEMS_PER_PAGE = 10;

export default async function fetchFilteredPersonas(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
  try {
    // http://localhost:3001/persona-next?query[apellido]=pinto&page=200
    // http://172.16.21.135:8056/persona/api/v1/personas?nombre=jose&apellido=pinto?nombre=jose&apellido=pinto&page=1
    // http://172.16.21.135:8056/persona/api/v1/personas?query=[nombre=jose&apellido=pinto]&page=1

    const params  = query ? '&apellido=' + query : ''; //solo para apellido
    const page    = currentPage ? '&page='+currentPage : '';
    const perPage = '&per-page='+ITEMS_PER_PAGE;
    
    const urlPersonas	= 'http://172.16.21.135:8056/persona/api/v1/personas?expand=documentos' + params + page + perPage;
    const tokenPersonas = '69673f1c-c3b0-413e-99b7-33430115b5e6';
    
    const res = await fetch(urlPersonas,
    {
      method: "GET",
      headers: {
        Authorization: tokenPersonas,
      },
    });

    // formato de datos
    const data  = await res.json();
    const pageCount = data.data.paginado.pageCount
    const items = await data.data.items;

    const listaPersonasJson = items.map(item => {
      // Verificar si la propiedad documentos está presente y no está vacía
      const numerosDocumento = item.documentos && item.documentos.length > 0
        ? item.documentos.map(doc => `${doc.tipo_documento.descripcion} ${doc.numero}`).join(' - ')
        : '';

      return {
        id_persona: item.id_persona,
        apellido: item.apellido,
        nombre: item.nombre,
        nro_documento: numerosDocumento,
        sexo: item.sexo?.descripcion,
        fecha_nacimiento: item.fecha_nacimiento
      };
    });

    return {'personas': listaPersonasJson, 'pageCount': pageCount};

  } catch (error) {
    console.error('Fetch Error:', error);
    throw new Error('Failed to fetch personas.' + error);
  }
}