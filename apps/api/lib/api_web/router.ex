defmodule TimerWeb.Router do
  use TimerWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", TimerWeb do
    pipe_through :api
  end
end
