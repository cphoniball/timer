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
    |> cast_attributes(attrs)
    |> put_assoc(:user, user)
  end

  def changeset(%TimeEntry{} = time_entry, attrs) do
    time_entry
    |> cast_attributes(attrs)
    |> assoc_constraint(:user)
  end

  defp cast_attributes(%TimeEntry{} = time_entry, attrs) do
    cast(time_entry, attrs, [:description, :started_at, :ended_at, :user_id])
  end
end
