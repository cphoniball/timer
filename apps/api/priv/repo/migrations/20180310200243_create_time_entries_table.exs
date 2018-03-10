defmodule Timer.Repo.Migrations.CreateTimeEntriesTable do
  use Ecto.Migration

  def change do
    create table(:time_entries) do
      add :user_id, references(:users)
      add :description, :string
      add :started_at, :utc_datetime
      add :ended_at, :utc_datetime

      timestamps()
    end
  end
end
