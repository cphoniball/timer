defmodule TimerWeb.UserController do
  use TimerWeb, :controller

  alias Timer.{Repo, User}

  def index(conn, _params) do
    users = Repo.all(User)
    render(conn, "index.json", %{users: users})
  end

  def show(conn, %{"user_id" => user}) do
    user = Repo.get(User, user)
    render(conn, "show.json", %{user: user})
  end
end
