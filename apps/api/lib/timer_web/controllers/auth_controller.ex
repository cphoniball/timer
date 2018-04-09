defmodule TimerWeb.AuthController do
  use TimerWeb, :controller

  alias Timer.Accounts.User
  alias Timer.Accounts
  alias TimerWeb.Guardian

  action_fallback TimerWeb.FallbackController

  def login(conn, %{"email" => email, "password" => password}) do
    with {:ok, %User{} = user} <- Accounts.authenticate_by_email_password(email, password),
         {:ok, token, _claims} <- Guardian.encode_and_sign(user)
    do
      conn |> render("logged_in.json", %{token: token})
    else
      {:error, :unauthorized} -> conn |> put_status(:unauthorized) |> render("unauthorized.json")
    end
  end

  def logout(conn, _params) do
    conn |> Guardian.Plug.sign_out() |> render("logged_out.json")
  end

  @doc """
  Get the currently authenticated user based on the connections JWT
  """
  def me(conn, %{"token" => token}) do
    # TODO: Handle the case where there is not an authenticated user here
    user = conn |> Guardian.Plug.current_resource()
    render(conn, TimerWeb.UserView, "show.json", %{user: user})
  end
end
