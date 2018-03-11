defmodule TimerWeb.TimerTest do
  use Timer.DataCase

  alias Timer.Timer
  alias Elixir.Timer.Timer.TimeEntry

  setup _context do
    %{
      user: insert(:user)
    }
  end

  describe "start_time_entry()" do
    test "should create a time entry with started_at set to the current time", %{user: user} do
      {:ok, time_entry} = Timer.start_time_entry(%{"user_id" => user.id})
      # Assert that less than one second has passed between the start of the time entry and the assertion
      assert DateTime.diff(DateTime.utc_now(), time_entry.started_at) < 1
    end
  end

  describe "end_time_entry()" do
    test "should update the given time entry with ended_at set to the current time", %{user: user} do
      with {:ok, started} = Timer.start_time_entry(%{"user_id" => user.id}),
           {:ok, ended} = Timer.stop_time_entry(started)
      do
          assert DateTime.diff(DateTime.utc_now(), ended.ended_at) < 1
      end
    end
  end
end
