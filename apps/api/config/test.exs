use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :timer, TimerWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :timer, Timer.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "root",
  database: "timer-test",
  hostname: "db-test",
  port: 5432,
  pool: Ecto.Adapters.SQL.Sandbox
