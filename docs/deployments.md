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


