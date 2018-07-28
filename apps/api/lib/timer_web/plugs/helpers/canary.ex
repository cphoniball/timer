defmodule TimerWeb.Plugs.Helpers.Canary do

  import Plug.Conn, only: [halt: 1]

  alias TimerWeb.FallbackController

  def unauthorized(conn) do
    conn |> FallbackController.unauthorized |> halt
  end

  def not_found(conn) do
    conn |> FallbackController.not_found |> halt
  end

end
