#!/bin/bash

# Install dependencies
mix local.rebar --force
mix deps.get

# Migrate and seed the database
mix ecto.migrate
mix run ./priv/repo/seeds.exs

# Start the phoenix server
mix phx.server
