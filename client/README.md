# Accept a Payment with Stripe Checkout

Stripe Checkout is the fastest way to get started with payments. Included are some basic build and run scripts you can use to start up the application.

## Running the sample

### Development

1. Build the application

```shell
$ npm install
```

2. _Optional_: download and run the [Stripe CLI](https://stripe.com/docs/stripe-cli)

```shell
$ stripe listen --forward-to localhost:3000/api/webhooks
```

3. Run the application

```shell
$ STRIPE_WEBHOOK_SECRET=$(stripe listen --print-secret) npm run dev
```

4. Go to [localhost:3000](http://localhost:3000)

### Production

1. Build the application

```shell
$ npm install

$ npm build
```

2. Run the application

```shell
$ npm start
```

NEW CARD ADDITION FLOW:

1. download all the images and put them in client/public/Polygonal Animal Drawings
2. name all them according to the convention "RARITY - NAME VARIATION of TOTAL_VARIATIONS.png"
3. go to cardDataUpdater folder
4. uncomment all the imports
5. uncomment this // FOR UPDATING THE JSON CONTAINING CARD PROP DATA
6. run with node
7. uncomment this // DO NOT EXECUTE THE BELOW CODE IF "cards" COLLECTION ALREADY HAS THE CARDS to update changes to database
8. run with node

TO GENERATE SUPABASE TYPES:
https://supabase.com/docs/guides/api/rest/generating-types

1. cd into client
2. npx supabase gen types typescript --project-id "PASTE_PROJECT_ID_HERE" --schema public > app/generated/types_db.ts

DEV ONLY:

1. make sure to paste all the envs in .env from vercel
2. go to https://supabase.com/dashboard/project/vdbkaqjcvygphoahmtgo/auth/url-configuration and change site url localhost or whatever
3. change the site url back when using deployed version
4. Go through the files in api and auth and change all the originLinks
