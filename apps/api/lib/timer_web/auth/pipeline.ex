defmodule TimerWeb.Auth.Pipeline do
  use Guardian.Plug.Pipeline, otp_app: :timer,
                              error_handler: TimerWeb.Auth.ErrorHandler,
                              module: TimerWeb.Guardian

  plug Guardian.Plug.VerifyHeader
  plug Guardian.Plug.EnsureAuthenticated
end
