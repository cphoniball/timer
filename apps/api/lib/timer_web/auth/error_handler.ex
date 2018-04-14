defmodule TimerWeb.Auth.ErrorHandler do
  import Plug.Conn

  def auth_error(conn, {type, _reason}, _opts) do
    body = to_string(type)

    conn
    |> put_status(:unauthorized)
    |> Phoenix.Controller.render(TimerWeb.ErrorView, "401.json")
  end
end
