defmodule Timer.Clients.Client do
  use Ecto.Schema
  import Ecto.Changeset
  alias Timer.Accounts.User

  schema "clients" do
    field :name, :string

    timestamps()

    belongs_to :users, User
  end

  @doc """
  Changeset for when a user is passed via the user object
  """
  def changeset(%Client{} = client, %{"user" => user} = attrs) do
    client
    |> cast(attrs, [:name])
    |> validate_required([:name])
    |> put_assoc(:user, user)
  end

  @doc """
  Changeset for when a user is passed via user_id
  """
  def changeset(%Client{} = client, attrs) do
    client
    |> cast(attrs, [:name])
    |> validate_required([:name])
    |> assoc_constraint(:user)
    |> cast_assoc(:user, required: true)
  end
end
