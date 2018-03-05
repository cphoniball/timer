defmodule TimerWeb.Router do
  use TimerWeb, :router

  pipeline :timer do
    plug :accepts, ["json"]
  end

  scope "/", TimerWeb do
    pipe_through :timer

    get "/", ApiController, :index

    get "/users", UserController, :index
    get "/users/:user_id", UserController, :show
    post "/users", UserController, :create
  end
end
