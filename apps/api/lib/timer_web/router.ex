defmodule TimerWeb.Router do
  use TimerWeb, :router

  pipeline :timer do
    plug :accepts, ["json"]
  end

  pipeline :require_authentication do
    plug TimerWeb.Auth.Pipeline
    plug TimerWeb.Plugs.CurrentUser
  end

  scope "/", TimerWeb do
    pipe_through :timer

    get "/", ApiController, :index

    # Authentication
    post "/token", AuthController, :create_token
    get "/me", AuthController, :me
  end

  scope "/", TimerWeb do
    pipe_through [:timer, :require_authentication]

    get "/clients", ClientController, :index
    get "/clients/:id", ClientController, :get
    post "/clients", ClientController, :create
    put "/clients/:id", ClientController, :update
    delete "/clients/:id", ClientController, :delete

    get "/time_entries", TimeEntryController, :index
    get "/time_entries/active", TimeEntryController, :active
    post "/time_entries", TimeEntryController, :create
    post "/time_entries/start", TimeEntryController, :start
    put "/time_entries/:time_entry_id", TimeEntryController, :update
    put "/time_entries/:time_entry_id/stop", TimeEntryController, :stop

    get "/users", UserController, :index
    get "/users/:user_id", UserController, :show
    post "/users", UserController, :create
    put "/users/:user_id", UserController, :update
    delete "/users/:user_id", UserController, :delete
  end
end
