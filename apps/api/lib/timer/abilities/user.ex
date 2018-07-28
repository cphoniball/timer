defimpl Canada.Can, for: Timer.Accounts.User do
  alias Timer.Accounts.User
  alias Timer.Clients.Client

  # Client controller
  def can?(%User{}, action, Client) when action in [:index, :create], do: true
  def can?(%User{id: user_id}, action, %Client{user_id: user_id}) when action in [:get, :update, :delete], do: true

  # Do not allow actions by default
  def can?(%User{}, _, _), do: false
end
