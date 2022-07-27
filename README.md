This is a simple book catalog webapp bootstraped with NextJS and TailwindCSS. Created in order to complete assignment challenge for FE position at [Deall](https://usedeall.com). The site design heavily inspired by [GeistUI](https://geist-ui.dev/en-us).

![preview](https://i.imgur.com/IqAdnLm.png)
![performance](https://i.imgur.com/EXckYrw.png)

## Getting Started

_Make sure you already had NodeJS ver >= 14 installed_.

- First, clone this repo.
- Second, install dependency, by default I'm using [pnpm](https://pnpm.io). (_It's encouraged to use pnpm_) But still you can use any package manager like `npm` or `yarn`

```bash
pnpm install
# or
yarn
# or
npm install
```

- Third, copy `.env.example` file to `.env.local` and fill the line with required config mentioned in the `.env.example` file.
- Lastly, run the development server:

```bash
pnpm dev
# or
yarn dev
# or
npm run dev
```

Open [http://127.0.0.1:3000](http://localhost:3000) with your browser to see the result.

## What could be improved from the API endpoint?

1. Add total number of available entry, so the frontend could process the pagination procedure.
2. Page field better to start from one instead of zero.
3. JSON sent from endpoint could be more polished with additional information.
4. When there is no book list available, I think it's better to show a message and empty list instead throwing 404 HTTP Code, since the endpoint clearly found.

## My workaround for the problem?

1. Implement proxy to communicate with original API backend. This way, I could bypass the CORS issue.
2. Added total number of available entry, so the frontend could process the pagination procedure.
3. Pagination page start from 1.
4. Polished how backend reponse the request with appropriate message. Example:

   ```
   // Normal response
   {
      "success": true,
      "message": "Books found",
      "data": [{...}, {...}, {...}]
   }

   // Error response
    {
      "success": false,
      "message": "Internal server error",
    }
   ```
