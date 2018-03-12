defmodule TimerWeb.Factory do
  use ExMachina.Ecto, repo: Timer.Repo

  def user_factory do
    %Timer.Accounts.User{
      name: Faker.Name.name(),
      email: Faker.Internet.email(),
      password: Faker.Lorem.word()
    }
  end

  def time_entry_factory do
    %Timer.Timer.TimeEntry{
      description: Faker.Lorem.sentence(),
      started_at: Faker.DateTime.backward(1),
      user: build(:user)
    }
  end
end
