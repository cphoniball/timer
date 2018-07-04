# Deployments

## Configuration requirements

References:

- [Using distillery with Phoenix](https://hexdocs.pm/distillery/use-with-phoenix.html)

See the above link for configuration changes you need to make to the `config/prod.exs` file.

## Building

Get the latest updates onto the server that the release will be running on.

Build the release using Distillery:

```bash
`MIX_ENV=prod mix release` to build the production release
```

This will generate a new release at a folder path like `_build/${environment}/rel/${application_name}/releases/${version}` that contains a file `${application_name}.tar.gz`. Copy that file into the directory you want your release to run from and untar it with:

```bash
tar xvf APPLICATION_NAME.tar.gz
```

Then run the application as a daemon with

```bash
PORT=80 ./bin/timer start
```

You should be all set!

TODO: Document if there are any differences here between deploying a new application and upgrading an existing one.
