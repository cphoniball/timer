defmodule Timer.Timer do
  @moduledoc """
  Context for functionality related to core timer functions.
  """

  alias Timer.Repo
  alias Timer.Timer.TimeEntry

  def list_time_entries, do: Repo.all(TimeEntry)

  def get_time_entry(id) do
    case Repo.get(TimeEntry, id) do
      %TimeEntry{} = time_entry ->
        {:ok, time_entry}
      nil ->
        {:error, :not_found}
    end
  end

  def start_time_entry(attrs \\ %{}) do
    attrs_with_start_time = Map.put(attrs, "started_at", DateTime.utc_now())

    %TimeEntry{}
    |> TimeEntry.changeset(attrs_with_start_time)
    |> Repo.insert()
  end

  def end_time_entry(%TimeEntry{} = time_entry) do
    time_entry
    |> update_time_entry(%{"ended_at" => DateTime.utc_now()})
  end

  def update_time_entry(%TimeEntry{} = time_entry, attrs) do
    time_entry
    |> TimeEntry.changeset(attrs)
    |> Repo.update()
  end
end
