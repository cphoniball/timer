defmodule Timer.Clients.Client do
  use Ecto.Schema
  import Ecto.Changeset
  alias Timer.Accounts.User
  alias Timer.Clients.Client

  schema "clients" do
    field :name, :string

    timestamps()

    belongs_to :user, User
  end

  def changeset(%Client{} = client, %{"user" => user} = attrs) do
    client
    |> cast(attrs, [:name])
    |> validate_required([:name])
    |> put_assoc(:user, user)
  end

  def changeset(%Client{} = client, attrs) do
    client
    |> cast(attrs, [:name])
    |> validate_required([:name])
    |> assoc_constraint(:user)
    |> cast_assoc(:user, required: true)
  end
end
