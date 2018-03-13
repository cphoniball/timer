defmodule Timer.TimerTest do
  use Timer.DataCase
  use Timex

  alias Timer.Timer
  alias Elixir.Timer.Timer.TimeEntry

  setup _context do
    %{
      user: insert(:user)
    }
  end

  describe "start_time_entry()" do
    test "should create a time entry with started_at set to the current time", %{user: user} do
      {:ok, time_entry} = Timer.start_time_entry(%{"user" => user})
      # Assert that less than one second has passed between the start of the time entry and the assertion
      assert DateTime.diff(DateTime.utc_now(), time_entry.started_at) < 1
    end
  end

  describe "stop_time_entry()" do
    test "should update the given time entry with ended_at set to the current time", %{user: user} do
      with {:ok, started} = Timer.start_time_entry(%{"user" => user}),
           {:ok, ended} = Timer.stop_time_entry(started)
      do
          assert DateTime.diff(DateTime.utc_now(), ended.ended_at) < 1
      end
    end
  end

  describe "update_time_entry()" do
    test "it should update the time entry with the given attributes" do
      with time_entry = insert(:time_entry),
           started_at = Timex.shift(time_entry.started_at, days: 3),
           {:ok, updated_time_entry} = Timer.update_time_entry(time_entry, %{"started_at" => started_at})
      do
        assert updated_time_entry.started_at == started_at
      end
    end
  end
end
