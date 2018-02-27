defmodule TimerWeb.ApiController do
  use TimerWeb, :controller

  def index(conn, _params) do
    text(conn, "Hello world!")
  end
end
