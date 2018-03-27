defmodule TimerWeb.TimeEntryView do
  use TimerWeb, :view

  def render("list.json", %{time_entries: time_entries}) do
    %{data: render_many(time_entries, TimerWeb.TimeEntryView, "time_entry.json")}
  end

  def render("show.json", %{time_entry: time_entry}) do
    %{data: render_one(time_entry, TimerWeb.TimeEntryView, "time_entry.json")}
  end

  def render("time_entry.json", %{time_entry: time_entry}) do
    %{
      id: time_entry.id,
      user_id: time_entry.user_id,
      description: time_entry.description,
      started_at: time_entry.started_at,
      ended_at: time_entry.ended_at
    }
  end
end
