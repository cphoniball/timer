defmodule TimerWeb.TimeEntryChannelTest do
  use TimerWeb.ChannelCase

  alias TimerWeb.TimeEntryChannel

  setup do
    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(TimeEntryChannel, "time_entry:lobby")

    {:ok, socket: socket}
  end

  describe "broadcast" do
    test "should broadcast the passed time entry to all sockets" do
      with time_entry = insert(:time_entry),
           TimeEntryChannel.broadcast("stop", time_entry),
           expected_result = %{id: time_entry.id, started_at: time_entry.started_at, ended_at: time_entry.ended_at}
      do
        assert_broadcast("stop", ^expected_result)
      end
    end
  end
end
