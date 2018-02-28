defmodule TimerWeb.UserController do
  use TimerWeb, :controller

  alias Timer.{Repo, User}

  def index(conn, _params) do
    users = Repo.all(User)
    json(conn, %{data: transform_users(users)})
  end

  # TODO: Figure out the conventional way to specify serialization strategies for ecto models
  defp transform_users(users) do
    Enum.map(users, fn (user) -> %{name: user.name, email: user.email} end)
  end
end
