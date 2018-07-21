defmodule Timer.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Timer.Accounts.User

  schema "users" do
    field :email, :string
    field :name, :string
    # TODO: Look into defining an ecto type to automatically cast the password to a hashed value
    # https://hexdocs.pm/ecto/Ecto.Type.html#content
    field :password, :string
    timestamps()

    has_many :time_entries, Timer.Timer.TimeEntry
    has_many :clients, Timer.Clients.Client
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:name, :email, :password])
    |> validate_required([:name, :email, :password])
  end
end
