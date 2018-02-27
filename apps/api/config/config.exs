# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :timer,
  namespace: Timer,
  ecto_repos: [Timer.Repo]

# Configures the endpoint
config :timer, TimerWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "90cyj10OC3zQNnoXYVybc81OLPX1JTL1/5BI6BEWD+Ow0o37IQ7PEaImtBVQcvbu",
  render_errors: [view: TimerWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: Timer.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
