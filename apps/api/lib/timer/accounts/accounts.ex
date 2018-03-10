defmodule Timer.Accounts do
  import Ecto.Query, warn: false

  alias Timer.Repo
  alias Timer.Accounts.User

  def list_users, do: Repo.all(User)

  def get_user(id) do
    case Repo.get(User, id) do
      %User{} = user ->
        {:ok, user}
      nil ->
        {:error, :not_found}
    end
  end

  def create_user(attrs \\ %{}) do
    %User{} |> User.changeset(attrs) |> Repo.insert()
  end

  def update_user(%User{} = user, attrs) do
    user |> User.changeset(attrs) |> Repo.update()
  end

  def delete_user(%User{} = user) do
    Repo.delete(user)
  end
end
