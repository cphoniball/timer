defmodule TimerWeb.TimeEntryControllerTest do
  use TimerWeb.ConnCase

  @description "This is a test description for a time entry."

  setup _context do
    %{conn: build_conn()}
  end

  describe "start" do
    test "should create a time entry with the current time" do
      with conn <- post(conn, time_entry_path(conn, :start, %{})),
           response <- json_response(conn, 201),
           started_at <- response["data"]["started_at"]
      do
        assert DateTime.diff(DateTime.utc_now(), started_at) < 1
      end
    end

    test "should create a time entry with the given description" do
      with conn <- post(conn, time_entry_path(conn, :start, %{"description" => @description})),
           response <- json_response(conn, 201)
      do
        assert response["data"]["description"] == @description
      end
    end
  end
end
