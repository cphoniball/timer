defmodule Timer.TimeEntryTest do
  use Timer.DataCase
  alias Timer.Timer.TimeEntry
  alias Timer.Accounts.User

  test "time_entry belongs to a user" do
    with user = insert(:user),
         changeset = TimeEntry.changeset(%TimeEntry{}, %{"started_at" => DateTime.utc_now(), "user" => user}),
         {:ok, time_entry} = Repo.insert(changeset),
         time_entry = Repo.preload(time_entry, :user)
    do
      assert time_entry.user == user
    end
  end
end
