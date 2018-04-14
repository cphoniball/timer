defmodule TimerWeb.AuthView do
  use TimerWeb, :view

  def render("logged_in.json", %{token: token}) do
    %{data: %{token: token}}
  end
end
