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

alias Timer.Factory

Timer.Repo.insert!(%Timer.Accounts.User{
  name: "Chris",
  email: "chris@chrishoniball.com",
  password: Comeonin.Bcrypt.hashpwsalt("password")
})

for _ <- 1..30, do: Factory.user()
