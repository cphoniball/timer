defmodule TimerWeb.ClientController do
  use TimerWeb, :controller

  alias Timer.Clients
  alias Timer.Clients.Client

  action_fallback TimerWeb.FallbackController

  plug :load_and_authorize_resource, model: Client, preload: :user

  def index(conn, _params) do
    with clients <- Clients.get_user_clients(conn.assigns[:current_user])
    do
      conn |> put_status(:ok) |> render("index.json", %{clients: clients})
    end
  end

  def get(conn, _params) do
    conn |> render("show.json", %{client: conn.assigns.client})
  end

  def create(conn, %{"client" => params}) do
    # Assign the currently authenticated user as the creator of this client
    with client <- Map.put(params, "user", conn.assigns[:current_user]),
         {:ok, client} <- Clients.create_client(client)
    do
      conn |> put_status(:created) |> render("show.json", %{client: client})
    end
  end

  def update(conn, %{"client" => attrs}) do
    with {:ok, client} <- Clients.update_client(conn.assigns.client, attrs)
    do
      conn |> put_status(:accepted) |> render("show.json", %{client: client})
    end
  end

  def delete(conn, _params) do
    with {:ok, _deleted_client} <- Clients.delete_client(conn.assigns.client)
    do
      conn |> render("show.json", %{client: conn.assigns.client})
    end
  end
end
