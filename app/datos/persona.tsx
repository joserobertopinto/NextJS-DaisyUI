import { TOKEN_PERSONAS, BASE_URL_PERSONAS } from "../config/contants";
const ITEMS_PER_PAGE = 10;

export default async function fetchFilteredPersonas(
  searchParams: string|undefined
) {
  try {
    const url	= new URL(BASE_URL_PERSONAS + '/api/v1/personas');
    console.log(url);
    url.searchParams.append('expand', 'documentos');

    Object.keys(searchParams).forEach((key) => {
        url.searchParams.append(key, searchParams[key]);
    });

    const perPage = '&per-page='+ITEMS_PER_PAGE;
    const urlPersonas	= url + perPage;
    const tokenPersonas = TOKEN_PERSONAS;

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