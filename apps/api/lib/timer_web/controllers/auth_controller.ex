defmodule TimerWeb.AuthController do
  use TimerWeb, :controller

  alias Plug.Conn
  alias Timer.Accounts.User
  alias Timer.Accounts
  alias TimerWeb.Guardian

  action_fallback TimerWeb.FallbackController

  def create_token(conn, %{"email" => email, "password" => password}) do
    with {:ok, %User{} = user} <- Accounts.authenticate_by_email_password(email, password),
         {:ok, token, _claims} <- Guardian.encode_and_sign(user)
    do
      conn |> render("logged_in.json", %{token: token})
    end
  end

  @doc """
  Get the currently authenticated user based on the connection's JWT token
  contained in the authorization header
  """
  def me(conn, _params) do
    with [authorization_header] when not is_nil(authorization_header) <- Conn.get_req_header(conn, "authorization"),
         token <- String.replace(authorization_header, "Bearer ", ""),
         {:ok, user, _claims} <- Guardian.resource_from_token(token)
    do
      render(conn, TimerWeb.UserView, "show.json", %{user: user})
    else
      [] -> {:error, :unprocessable_entity}
      {:error, _details} -> {:error, :unauthorized}
    end
  end
end
