defmodule Timer.Timer.TimeEntry do
  use Ecto.Schema
  import Ecto.Changeset
  alias Timer.Accounts.User
  alias Timer.Timer.TimeEntry

  schema "time_entries" do
    field :description, :string
    field :started_at, :utc_datetime
    field :ended_at, :utc_datetime

    belongs_to :user, User
  end

  def changeset(%TimeEntry{} = time_entry, attrs) do
    time_entry
    |> cast(attrs, [:description, :started_at, :ended_at, :user_id])
    |> validate_required([:started_at, :user_id])
  end
end
