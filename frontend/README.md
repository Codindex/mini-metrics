This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

We created a virtual environment with: py -m venv .venv
Link Mysql and prisma using Python: https://prisma-client-py.readthedocs.io/en/stable/

### DATABASE MySQL

Create a DataBase schema on MySQL db_metrics
Create tables on that schema that you name user, hour and formula
Configure the file .env by replacing the values the database name, user name, its password, the connection's name, its port and the schema's name
Test the API routes with Postman with the POST request and using the link localhost:3000/api/formula, to populate the db with a dummy data containing a fomula's value and the date and time of its creation
Create a file mysql_credentials.yaml and apply it to the cluster using the command helm install mycluster.....???
To check wether the credentials have been well configured run the command helm get manifest mycluster
Create a new user in the MySQL cluster called mycluster
Grant this new user the right privileges to access and manipulate the db
