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
    put "/users/:user_id", UserController, :update
    delete "/users/:user_id", UserController, :delete

    post "/time_entries/start", TimeEntryController, :start
    put "/time_entries/:time_entry_id", TimeEntryController, :update
    put "/time_entries/:time_entry_id/stop", TimeEntryController, :stop
  end
end
