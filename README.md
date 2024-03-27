This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
Clonar repositorio
```bash
  git clone git@github.com:joserobertopinto/nextjs-daisyui.git
```
Correr npm install dentro de la carpeta
```bash
  npm install
```
Editar archivo app/config/constant.ts con los datos locales
```bash
export const BASE_URL_PERSONAS  = 'http://172.16.21.**:8056/persona';
export const TOKEN_PERSONAS     = '*****************';
```	
correr servidor next en modo dev
```bash
  nmp run dev
```

Abrir [http://localhost:3000](http://localhost:3000) con tu navegador, para ver los resultados.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
