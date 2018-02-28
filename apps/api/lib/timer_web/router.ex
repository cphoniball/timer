defmodule TimerWeb.Router do
  use TimerWeb, :router

  pipeline :timer do
    plug :accepts, ["json"]
  end

  scope "/", TimerWeb do
    pipe_through :timer

    get "/", ApiController, :index
    get "/users", UserController, :index
  end
end
