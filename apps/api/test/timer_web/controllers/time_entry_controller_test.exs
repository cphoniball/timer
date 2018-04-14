defmodule TimerWeb.TimeEntryControllerTest do
  use TimerWeb.ConnCase
  use Timex

  alias TimerWeb.TimeEntryView

  @description "This is a test description for a time entry."

  setup _context do
    user = insert(:user)

    %{
      conn: build_authenticated_conn(),
      body: %{"time_entry" => %{"user" => %{"id" => user.id}}}
    }
  end

  describe "active" do
    test "should return a list of the active time entries", %{conn: conn} do
      with active <- insert(:time_entry),
           _inactive <- insert(:time_entry, %{ended_at: DateTime.utc_now()}),
           conn <- get(conn, time_entry_path(conn, :active)),
           response <- response(conn, 200)
      do
        assert response == Poison.encode!(TimeEntryView.render("list.json", %{time_entries: [active]}))
      end
    end
  end

  describe "create" do
    test "should create a time entry with the given parameters", %{conn: conn, body: body} do
      # TODO: Is there a more compact way to update the map here?
      now = DateTime.utc_now()
      later = Timex.shift(now, minutes: 15)
      body = put_in(body["time_entry"]["started_at"], now)
      body = put_in(body["time_entry"]["ended_at"], later)
      with conn <- post(conn, time_entry_path(conn, :create), body),
           response <- json_response(conn, 201)
      do
        assert response["data"]["started_at"] == DateTime.to_iso8601(now)
        assert response["data"]["ended_at"] == DateTime.to_iso8601(later)
      end
    end
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

    test "should return a 404 response if the time entry cannot be found", %{conn: conn} do
      conn = put(conn, time_entry_path(conn, :stop, 1000000))

      assert json_response(conn, 404) == %{
        "data" => nil,
        "errors" => %{"message" => "Resource not found.", "detail" => []}
      }
    end
  end

  describe "update" do
    test "should allow updating the description, start_time, and end_time of a time entry", %{conn: conn} do
      with cur_time <- DateTime.to_iso8601(DateTime.utc_now()),
           time_entry <- insert(:time_entry),
           params <- %{"started_at" => cur_time, "ended_at" => cur_time, "description" => @description},
           conn <- put(conn, time_entry_path(conn, :update, time_entry.id), %{"time_entry" => params}),
           response <- json_response(conn, 202),
           time_entry <- response["data"]
      do
        assert time_entry["started_at"] == cur_time
        assert time_entry["ended_at"] == cur_time
        assert time_entry["description"] == @description
      end
    end
  end

  defp start_time_entry(conn, body) do
    post(conn, time_entry_path(conn, :start, body)) |> json_response(201)
  end
end
