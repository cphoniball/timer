defmodule TimerWeb.UserController do
  use TimerWeb, :controller

  alias Timer.Accounts
  alias TimerWeb.ApiView

  action_fallback TimerWeb.FallbackController

  def index(conn, _params) do
    users = Accounts.list_users()
    render(conn, "index.json", %{users: users})
  end

  def show(conn, %{"user_id" => id}) do
    with {:ok, user} <- Accounts.get_user(id) do
      conn |> render("show.json", %{user: user})
    end
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, user} <- Accounts.create_user(user_params) do
        conn
        |> put_status(:created)
        |> render("show.json", %{user: user})
    end
  end

  def update(conn, %{"user_id" => id, "user" => user_params}) do
    with {:ok, user} <- Accounts.get_user(id),
         {:ok, updated_user} <- Accounts.update_user(user, user_params)
    do
      conn |> put_status(:accepted) |> render("show.json", %{user: updated_user})
    end
  end

  def delete(conn, %{"user_id" => user_id}) do
    with {:ok, user} <- Accounts.get_user(user_id),
         {:ok, _deleted_user} <- Accounts.delete_user(user)
    do
      conn |> render("show.json", %{user: user})
    end
  end
end
