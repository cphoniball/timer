defmodule Timer.TimeEntryTest do
  use Timer.DataCase
  alias Timer.Timer.TimeEntry
  alias Timer.Accounts.User

  describe "time_entry belongs to a user" do
    test "should be able to access a time entry's user with time_entry.user" do
      with user = insert(:user),
           changeset = TimeEntry.changeset(%TimeEntry{}, %{"started_at" => DateTime.utc_now(), "user" => user}),
           {:ok, time_entry} = Repo.insert(changeset),
           time_entry = Repo.preload(time_entry, :user)
      do
        assert time_entry.user == user
      end
    end

    test "should not be able to save a time_entry without a user" do
      changeset = TimeEntry.changeset(%TimeEntry{}, %{"started_at" => DateTime.utc_now()})
      {:error, changeset} = Repo.insert(changeset)

      assert [user: {"can't be blank", _validation}] = changeset.errors
    end
  end
end
