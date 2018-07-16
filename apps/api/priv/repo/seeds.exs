# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Timer.Repo.insert!(%Timer.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

import Timer.Factory

insert(:user, %{
  name: "Chris",
  email: "chris@chrishoniball.com",
  password: Comeonin.Bcrypt.hashpwsalt("password")
})

# TODO: Modify this so that we create a client for each user
for _ <- 1..10, do: insert(:user)
for _ <- 1..10, do: insert(:client)
