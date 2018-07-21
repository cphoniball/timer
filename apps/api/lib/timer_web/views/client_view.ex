defmodule TimerWeb.ClientView do
  use TimerWeb, :view

  def render("index.json", %{clients: clients}) do
    %{data: render_many(clients, TimerWeb.ClientView, "client.json")}
  end

  def render("show.json", %{client: client}) do
    %{data: render_one(client, TimerWeb.ClientView, "client.json")}
  end

  def render("client.json", %{client: client}) do
    %{id: client.id, name: client.name}
  end
end
