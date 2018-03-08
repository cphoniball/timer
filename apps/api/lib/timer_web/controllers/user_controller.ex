defmodule TimerWeb.UserController do
  use TimerWeb, :controller

  alias Timer.{Repo, User}
  alias TimerWeb.ApiView

  # TODO: Use fallback controller to clean up duplicated logic here

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

  def create(conn, %{"name" => name, "password" => password, "email" => email}) do
    case Repo.insert(%User{name: name, password: password, email: email}) do
      {:ok, user} ->
        conn
        |> put_status(:created)
        |> render("show.json", %{user: user, status: :created})
      # TODO: Use the changeset to return an appropriate response here
      {:error, _changeset} ->
        conn
        |> put_status(:error)
        |> render(ApiView, "error.json", %{message: "Could not create user."})
    end
  end

  # TODO: Update the handling below so we handle not finding the user appropriately
  def delete(conn, %{"user_id" => user_id}) do
    user = Repo.get!(User, user_id)

    case Repo.delete(user) do
      {:ok, user} ->
        conn |> render(ApiView, "deleted.json", %{id: user.id})
      {:error, _changeset} ->
        conn |> put_status(:error) |> render(ApiView, "error.json", %{message: "Could not delete user."})
    end
  end
end
