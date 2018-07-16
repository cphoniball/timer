defmodule Timer.Factory do
  use ExMachina.Ecto, repo: Timer.Repo

  def user_factory do
    %Timer.Accounts.User{
      name: Faker.Name.name(),
      email: Faker.Internet.email(),
      password: Faker.Lorem.word()
    }
  end

  # TODO: How am I supposed to do relationships in these factories?
  def client_factory do
    %Timer.Clients.Client{
      name: Faker.Name.name(),
      user: build(:user)
    }
  end
end
