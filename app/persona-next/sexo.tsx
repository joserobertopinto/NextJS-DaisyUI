const ITEMS_PER_PAGE = 10;

export default async function fetchSexo(
  searchParams: string|undefined
) {
  try {
    const url	= new URL('http://172.16.21.135:8056/persona/api/v1/sexos');
    url.searchParams.append('expand', 'documentos');

    Object.keys(searchParams).forEach((key) => {
        url.searchParams.append(key, searchParams[key]);
    });

    const perPage = '&per-page='+ITEMS_PER_PAGE;
    const urlSexos	= url + perPage;
    const tokenPersonas = '69673f1c-c3b0-413e-99b7-33430115b5e6';

    const res = await fetch(urlSexos,
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

    const listaSexosJson = items.map(item => {
      return {
        id: item.id_sexo,
        descripcion: item.descripcion,
      };
    });

    return {'sexos': listaSexosJson, 'pageCount': pageCount};

  } catch (error) {
    console.error('Fetch Error:', error);
    throw new Error('Failed to fetch sexos.' + error);
  }
}