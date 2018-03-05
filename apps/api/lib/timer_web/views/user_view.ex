defmodule TimerWeb.UserView do
  use TimerWeb, :view
  alias TimerWeb.ApiView

  def render("index.json", %{users: users}) do
    ApiView.success(%{data: render_many(users, TimerWeb.UserView, "user.json")})
  end

  def render("show.json", %{user: user}) do
    ApiView.success(%{data: render_one(user, TimerWeb.UserView, "user.json")})
  end

  def render("show.json", %{user: user}) do
    ApiView.success(%{data: render_one(user, TimerWeb.UserView, "user.json")})
  end

  def render("user.json", %{user: user}) do
    %{id: user.id, name: user.name, email: user.email}
  end
end
