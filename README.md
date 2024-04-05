# TSOA Express Backend
This Repository is meant to be a quickstart for building your own backend using [tsoa](https://tsoa-community.github.io/docs/) and [express](https://expressjs.com)

## Architecture
This repository is built around the MVC design pattern, with every "entity" in the backend treated as a first-class object around which models, views, and controllers are centered.

As defined in the tsoa specifications, functionality to manipulate models (i.e., the "controllers" in MVC) are denoted as services, whereas routes are generated from the corresponding `routes.ts` files.

Models are generated via [TypeGoose](https://typegoose.github.io/typegoose/) and the backend integrates with a MongoDB database.

The core philosophy of this backend is to be self-documenting via TypeScript types and JSDoc in `routes.ts`. Running `yarn dev` or `yarn build` will automatically generate swagger docs served at `localhost:{Process Port}/docs`.

## Usage
After cloning this repository, duplicate the `.envtemplate` file and rename it to `.env`. In local environments, set `NODE_ENV` equal to `dev`, and populate the `DEV_URI` and `PROD_URI` variables with your dev and prod MongoDB drive connection URIs, respectively.

Once your `.env` is set up, run `yarn dev` to start a development server (which automatically restarts and recompiles swagger docs on saving any file in `src/`). To run a production build, use:
```
yarn build
yarn start
```