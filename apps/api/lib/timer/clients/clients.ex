
defmodule Timer.Clients do
  import Ecto.Query, warn: false

  alias Timer.Accounts.User
  alias Timer.Clients.Client
  alias Timer.Repo

  def get_user_clients(%User{} = user) do
    Repo.preload(user, :clients)
    |> Map.get(:clients)
  end

  def create_client(attrs \\ %{}) do
    %Client{}
    |> Client.changeset(attrs)
    |> Repo.insert()
  end
end
