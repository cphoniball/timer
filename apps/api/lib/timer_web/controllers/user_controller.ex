defmodule TimerWeb.UserController do
  use TimerWeb, :controller

  alias Timer.Accounts
  alias TimerWeb.ApiView

  action_fallback TimerWeb.FallbackController

  def index(conn, _params) do
    users = Accounts.list_users()
    render(conn, "index.json", %{users: users})
  end

  def show(conn, %{"user_id" => user_id}) do
    with {:ok, user} <- Accounts.get_user(user_id) do
      conn |> render("show.json", %{user: user})
    end
  end

  def create(conn, user_params) do
    with {:ok, user} <- Accounts.create_user(user_params) do
        conn
        |> put_status(:created)
        |> render("show.json", %{user: user})
    end
  end

  # TODO: Update the handling below so we handle not finding the user appropriately
  def delete(conn, %{"user_id" => user_id}) do
    with {:ok, user} <- Accounts.get_user(user_id),
         {:ok, _deleted_user} <- Accounts.delete_user(user)
    do
      conn |> render(ApiView, "deleted.json", %{id: user.id})
    end
  end
end
