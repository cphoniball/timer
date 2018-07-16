defmodule TimerWeb.Auth.ErrorHandler do
  import Plug.Conn

  def auth_error(conn, {_type, _reason}, _opts) do
    conn
    |> put_status(:unauthorized)
    |> Phoenix.Controller.render(TimerWeb.ErrorView, "401.json")
  end
end
