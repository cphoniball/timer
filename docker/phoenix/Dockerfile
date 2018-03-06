# Note that this is built from erlang:20
FROM elixir:1.6

# Install GCC, required for elixir_argon2
RUN apt-get update
RUN apt-get install -y build-essential

# Install erlang-dev for elixir_argon2
RUN apt-get install -y erlang-dev

# Install/upgrade hex to the latest version
RUN mix local.hex --force

# Install Phoenix
RUN mix archive.install https://github.com/phoenixframework/archives/raw/master/phx_new.ez

# Start our Phoenix server
CMD ["mix", "phx.server"]
