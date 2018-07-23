defmodule TimerWeb.Plugs.CurrentUser do
  alias TimerWeb.Guardian
  import Plug.Conn

  def init(default), do: default

  def call(conn, _options) do
    with {:ok, user, _claims} <- Guardian.Plug.current_token(conn) |> Guardian.resource_from_token()
    do
      conn |> assign(:current_user, user)
    end
  end
end
