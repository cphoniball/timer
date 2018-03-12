defmodule Timer.Timer.TimeEntry do
  use Ecto.Schema
  import Ecto.Changeset
  alias Timer.Accounts.User
  alias Timer.Timer.TimeEntry

  schema "time_entries" do
    field :description, :string
    field :started_at, :utc_datetime
    field :ended_at, :utc_datetime
    timestamps()

    belongs_to :user, User
  end

  # TODO: Work on removing the duplication from these changesets
  def changeset(%TimeEntry{} = time_entry, %{"user" => user} = attrs) do
    time_entry
    |> cast(attrs, [:description, :started_at, :ended_at])
    |> put_assoc(:user, user)
  end

  def changeset(%TimeEntry{} = time_entry, attrs) do
    time_entry
    |> cast(attrs, [:description, :started_at, :ended_at, :user_id])
    |> assoc_constraint(:user)
  end
end
