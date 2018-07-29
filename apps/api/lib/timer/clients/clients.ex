
defmodule Timer.Clients do
  import Ecto.Query, warn: false

  alias Timer.Accounts.User
  alias Timer.Clients.Client
  alias Timer.Repo

  def get_user_clients(%User{} = user) do
    Repo.preload(user, :clients)
    |> Map.get(:clients)
  end

  def get_client(id) do
    case Repo.get(Client, id) do
      %Client{} = client ->
        {:ok, client}
      nil ->
        {:error, :not_found}
    end
  end

  def create_client(attrs \\ %{}) do
    %Client{}
    |> Client.changeset(attrs)
    |> Repo.insert()
  end

  def update_client(%Client{} = client, attrs) do
    client
    |> Client.changeset(attrs)
    |> Repo.update()
  end

  def delete_client(%Client{} = client) do
    Repo.delete(client)
  end
end
