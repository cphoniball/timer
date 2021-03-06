defmodule TimerWeb.TimeEntryChannel do
  use TimerWeb, :channel

  alias Timer.Timer.TimeEntry
  alias TimerWeb.TimeEntryView

  def join("time_entry:lobby", _payload, socket) do
    {:ok, socket}
  end

  def handle_out(event, payload, socket) do
    push(socket, event, payload)
    {:noreply, socket}
  end

  # Borrowing from http://learningelixir.joekain.com/pushing-model-changes-to-a-phoenix-channel/
  def broadcast(event, %TimeEntry{} = time_entry) do
    TimerWeb.Endpoint.broadcast(
      "time_entry:lobby",
      event,
      TimeEntryView.render("time_entry.json", %{time_entry: time_entry})
    )
  end

  # # Channels can be used in a request/response fashion
  # # by sending replies to requests from the client
  # def handle_in("ping", payload, socket) do
  #   {:reply, {:ok, payload}, socket}
  # end

  # # It is also common to receive messages from the client and
  # # broadcast to everyone in the current topic (time_entry:lobby).
  # def handle_in("shout", payload, socket) do
  #   broadcast socket, "shout", payload
  #   {:noreply, socket}
  # end
end
