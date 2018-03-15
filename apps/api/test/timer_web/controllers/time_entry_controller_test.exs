defmodule TimerWeb.TimeEntryControllerTest do
  use TimerWeb.ConnCase

  @description "This is a test description for a time entry."

  setup _context do
    user = insert(:user)

    %{
      conn: build_conn(),
      body: %{"time_entry" => %{"user" => %{"id" => user.id}}}
    }
  end

  describe "start" do
    test "should create a time entry with the current time", %{conn: conn, body: body} do
      with conn <- post(conn, time_entry_path(conn, :start, body)),
           response <- json_response(conn, 201),
           {:ok, started_at} <- DateTime.from_iso8601(response["data"]["started_at"])
      do
        assert DateTime.diff(DateTime.utc_now(), started_at, :second) < 1
      end
    end

    test "should create a time entry with the given description", %{conn: conn, body: body} do
      with body_with_description = put_in(body["time_entry"]["description"], @description),
           conn <- post(conn, time_entry_path(conn, :start, body_with_description)),
           response <- json_response(conn, 201)
      do
        assert response["data"]["description"] == @description
      end
    end
  end
end
