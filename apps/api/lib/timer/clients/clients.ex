defmodule Timer.Clients do
  import Ecto.Query, warn: false

  alias Timer.Repo
  alias Timer.Clients.Client

  def create_client(attrs \\ %{}) do
    %Client{} |> Client.changeset(attrs) |> Repo.insert()
  end
end
