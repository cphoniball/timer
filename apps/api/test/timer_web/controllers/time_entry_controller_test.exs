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
      with response = start_time_entry(conn, body),
           {:ok, started_at} <- DateTime.from_iso8601(response["data"]["started_at"])
      do
        assert DateTime.diff(DateTime.utc_now(), started_at, :second) < 1
      end
    end

    test "should create a time entry with the given description", %{conn: conn, body: body} do
      with body_with_description = put_in(body["time_entry"]["description"], @description),
           response = start_time_entry(conn, body_with_description)
      do
        assert response["data"]["description"] == @description
      end
    end

    # test "should return a 422 status code if the given user cannot be found"
  end

  describe "stop" do
    test "should stop the time entry at the current time", %{conn: conn, body: body} do
      with time_entry <- start_time_entry(conn, body)["data"],
           conn <- put(conn, time_entry_path(conn, :stop, time_entry["id"])),
           response <- json_response(conn, 202),
           {:ok, ended_at} <- DateTime.from_iso8601(response["data"]["ended_at"])
      do
        assert DateTime.diff(ended_at, DateTime.utc_now(), :second) < 1
      end
    end

    test "should return a 404 response if the time entry cannot be found", %{conn: conn, body: body} do
      conn = put(conn, time_entry_path(conn, :stop, 1000000))

      assert json_response(conn, 404) == %{
        "data" => nil,
        "errors" => %{"message" => "Resource not found.", "detail" => []}
      }
    end
  end

  defp start_time_entry(conn, body) do
    post(conn, time_entry_path(conn, :start, body)) |> json_response(201)
  end
end
