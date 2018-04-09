defmodule TimerWeb.Router do
  use TimerWeb, :router

  pipeline :timer do
    plug :accepts, ["json"]
  end

  scope "/", TimerWeb do
    pipe_through :timer

    get "/", ApiController, :index

    # Authentication
    post "/login", AuthController, :login
    post "/logout", AuthController, :logout
    get "/me", AuthController, :me

    get "/users", UserController, :index
    get "/users/:user_id", UserController, :show
    post "/users", UserController, :create
    put "/users/:user_id", UserController, :update
    delete "/users/:user_id", UserController, :delete

    get "/time_entries/active", TimeEntryController, :active
    post "/time_entries", TimeEntryController, :create
    post "/time_entries/start", TimeEntryController, :start
    put "/time_entries/:time_entry_id", TimeEntryController, :update
    put "/time_entries/:time_entry_id/stop", TimeEntryController, :stop
  end
end
