defmodule TimerWeb.ClientController do
  use TimerWeb, :controller

  alias Timer.Clients
  alias TimerWeb.Guardian

  action_fallback TimerWeb.FallbackController

  def index(conn, _params) do
    IO.puts inspect(conn.assigns)
    with clients <- Clients.get_user_clients(conn.assigns[:current_user])
    do
      conn |> put_status(:ok) |> render("index.json", %{clients: clients})
    end
  end

  def create(conn, %{"client" => params}) do
    # Assign the currently authenticated user as the creator of this client
    with client <- Map.put(params, "user", conn.assigns[:current_user]),
         {:ok, client} <- Clients.create_client(client)
    do
      conn |> put_status(:created) |> render("show.json", %{client: client})
    end
  end
end
