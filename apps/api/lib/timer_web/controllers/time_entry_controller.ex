defmodule TimerWeb.TimeEntryController do
  use TimerWeb, :controller

  alias TimerWeb.TimeEntryChannel
  alias Timer.Timer

  action_fallback TimerWeb.FallbackController

  # def active(conn, %{}) do

  # end

  def create(conn, %{"time_entry" => params}) do
    with {:ok, time_entry} <- Timer.create_time_entry(params) do
      conn |> put_status(:created) |> render("show.json", %{time_entry: time_entry})
    end
  end

  def start(conn, %{"time_entry" => params}) do
    with {:ok, time_entry} <- Timer.start_time_entry(params) do
      conn |> put_status(:created) |> render("show.json", %{time_entry: time_entry})
    end
  end

  def stop(conn, %{"time_entry_id" => time_entry_id}) do
    with {:ok, time_entry} <- Timer.get_time_entry(time_entry_id),
         {:ok, stopped} <- Timer.stop_time_entry(time_entry)
    do
      # Broadcast stop to all clients so that timers do not keep running on clients that did
      # not send the stop request.
      TimeEntryChannel.broadcast_stop(stopped)
      conn |> put_status(:accepted) |> render("show.json", %{time_entry: stopped})
    end
  end

  def update(conn, %{"time_entry_id" => time_entry_id, "time_entry" => time_entry_params}) do
      with {:ok, time_entry} = Timer.get_time_entry(time_entry_id),
           {:ok, time_entry} = Timer.update_time_entry(time_entry, time_entry_params)
      do
        conn |> put_status(:accepted) |> render("show.json", %{time_entry: time_entry})
      end
  end
end
