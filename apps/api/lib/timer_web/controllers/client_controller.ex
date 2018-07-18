defmodule TimerWeb.ClientController do
  use TimerWeb, :controller

  alias Timer.Clients
  alias TimerWeb.Guardian

  action_fallback TimerWeb.FallbackController

  def create(conn, %{"client" => params}) do
    with {:ok, user, _claims} <- Guardian.Plug.current_token(conn) |> Guardian.resource_from_token(),
         # Assign the currently authenticated user as the creator of this client
         client <- Map.put(params, "user", user),
         {:ok, client} <- Clients.create_client(client)
    do
      client |> inspect() |> IO.puts()
      conn |> put_status(:created) |> render("show.json", %{client: client})
    end
  end
end
