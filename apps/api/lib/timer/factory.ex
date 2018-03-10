defmodule Timer.Factory do
  alias Timer.Repo

  def user do
    Repo.insert!(%Timer.Accounts.User{
      name: Faker.Name.name(),
      email: Faker.Internet.email(),
      password: Faker.Lorem.word()
    })
  end
end
