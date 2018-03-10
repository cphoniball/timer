defmodule TimerWeb.FallbackView do
  use TimerWeb, :view

  alias Plug.Conn.Status

  def render("404.json", _assigns) do
    %{
      status: Status.code(:not_found),
      data: nil,
      errors: %{
        message: "Could not find the specified resource.",
        detail: []
      }
    }
  end

end
