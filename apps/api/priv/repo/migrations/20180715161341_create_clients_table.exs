defmodule Timer.Repo.Migrations.CreateClientsTable do
  use Ecto.Migration

  def change do
    create table(:clients) do
      add :user_id, references(:users)
      add :name, :string

      timestamps()
    end
  end
end
