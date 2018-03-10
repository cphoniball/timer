defmodule TimerWeb.FallbackController do
  use Phoenix.Controller

  alias TimerWeb.FallbackView

  def call(conn, {:error, :not_found}) do
    conn |> put_status(:not_found) |> render(FallbackView, "404.json")
  end
end
