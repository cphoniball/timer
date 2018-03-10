defmodule TimerWeb.Factory do
  use ExMachina.Ecto, repo: Timer.Repo

  def user_factory do
    %Timer.Accounts.User{
      name: Faker.Name.name(),
      email: Faker.Internet.email(),
      password: Faker.Lorem.word()
    }
  end
end
