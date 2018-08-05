# Timer

## Development

Development requires docker and docker-compose. You have two options for development, 1) run everything in docker using and 2) run dependencies (postgres, nginx) in docker and run the applications (Phoenix, React) locally on your machine.

### Option 1: Run everything in Docker

- Clone the repo to your local machine
- `cd` into the new directory you just created
- Run `docker-compose up`
- Access the site at `localhost:4000`

### Option 2: Run dependencines on Docker, run applications locally

This option usually yields significantly better performance on Mac OS.

You'll need to ensure you have Elixir v1.6, NodeJS v9.10, and Yarn 1.9.4 installed locally. Other versions of these dependencies will likely work, but that is what is currently being developed with, so use other versions at your own risk.

- Clone the repo to your local machine
- `cd` into the new directory you just created
- Run `docker-compose up -d deps`. This will start only the databases and Nginx
- `cd` into `apps/api` and run `./entrypoint.sh`. This will install dependencies, run database migrations/seeds, and start up your Phoenix server.
- In a separate terminal window, `cd` into `apps/client` and run `yarn install && yarn run dev`. This will install dependencies and boot up your webpack dev server.
- Access the site at `localhost:4000`



