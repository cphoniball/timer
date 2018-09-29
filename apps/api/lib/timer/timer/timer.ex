defmodule Timer.Timer do
  @moduledoc """
  Context for functionality related to core timer functions.
  """
  import Ecto.Query

  alias Timer.Repo
  alias Timer.Timer.TimeEntry
  alias Timer.Accounts.User

  def get_user_time_entries(%User{} = user) do
    Repo.preload(user, [time_entries: from(t in TimeEntry, order_by: [desc: t.started_at])])
    |> Map.get(:time_entries)
  end

  @doc """
  Retrieves all active time entries, i.e. time entries that have a 'started_at' time but not an
  'ended_at' time.
  """
  def get_active_time_entries() do
    Repo.all(from t in TimeEntry, where: not is_nil(t.started_at), where: is_nil(t.ended_at), order_by: [desc: t.started_at])
  end

  def get_time_entry(id) do
    case Repo.get(TimeEntry, id) |> Repo.preload(:user) do
      %TimeEntry{} = time_entry ->
        {:ok, time_entry}
      nil ->
        {:error, :not_found}
    end
  end

  def create_time_entry(attrs \\ %{}) do
    %TimeEntry{}
    |> TimeEntry.changeset(attrs)
    |> Repo.insert()
  end

  def start_time_entry(attrs \\ %{}) do
    Map.put(attrs, "started_at", DateTime.utc_now())
    |> create_time_entry
  end

  def stop_time_entry(%TimeEntry{} = time_entry) do
    time_entry
    |> update_time_entry(%{"ended_at" => DateTime.utc_now()})
  end

  def update_time_entry(%TimeEntry{} = time_entry, attrs) do
    time_entry
    |> TimeEntry.changeset(attrs)
    |> Repo.update()
  end
end
