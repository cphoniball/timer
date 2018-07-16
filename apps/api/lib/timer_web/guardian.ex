defmodule TimerWeb.Guardian do
  use Guardian, otp_app: :timer

  alias Timer.Accounts.User
  alias Timer.Accounts

  @doc """
  Given a resource to create a token for, return an identifying field to be used in the "sub"
  field of the token.
  """
  def subject_for_token(%User{} = user, _class) do
    {:ok, to_string(user.id)}
  end

  def subject_for_token(_resource, _claims), do: {:error, :resource_not_recognized}

  @doc """
  Given claims from a token, get the resource that the token is responsible for
  """
  def resource_from_claims(claims) do
    Accounts.get_user(claims["sub"])
  end

  # TODO: This isn't properly going to match no claims here
  # def resource_from_claims(_claims), do: {:error, :no_claims}
end
