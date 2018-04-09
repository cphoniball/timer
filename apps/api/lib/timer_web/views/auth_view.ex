defmodule TimerWeb.AuthView do
  use TimerWeb, :view

  def render("logged_in.json", %{token: token}) do
    %{data: %{token: token}}
  end

  def render("loggout_out.json", _params) do
    %{data: %{message: "Logged out."}}
  end

  def render("unauthorized.json", _params) do
    %{data: %{message: "Unauthorized."}}
  end
end
