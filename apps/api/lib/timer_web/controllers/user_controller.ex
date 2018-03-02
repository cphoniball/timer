defmodule TimerWeb.UserController do
  use TimerWeb, :controller

  alias Timer.{Repo, User}
  alias TimerWeb.ApiView

  def index(conn, _params) do
    users = Repo.all(User)
    render(conn, "index.json", %{users: users})
  end

  def show(conn, %{"user_id" => user_id}) do
    case Repo.get(User, user_id) do
      user = %User{} ->
        conn |> render("show.json", %{user: user})
      nil ->
        conn
        |> put_status(:not_found)
        |> render(ApiView, "not_found.json", %{message: "Could not find that user."})
    end
  end
end