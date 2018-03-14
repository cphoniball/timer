defmodule TimerWeb.TimeEntryController do
  use TimerWeb, :controller

  alias Timer.Timer

  def start(conn, %{"time_entry" => params}) do
    with {:ok, time_entry} <- Timer.start_time_entry(params) do
      conn |> put_status(:created) |> render("show.json", %{time_entry: time_entry})
    end
  end

  def stop(conn, %{"id" => id}) do
    with {:ok, time_entry} <- Timer.get_time_entry(id),
         {:ok, stopped} = Timer.stop_time_entry(time_entry)
    do
      conn |> put_status(:accepted) |> render("show.json", %{time_entry: stopped})
    end
  end
end