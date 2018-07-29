defmodule Timer.ClientsTest do
  use Timer.DataCase
  alias Timer.Clients

  describe "update client" do
    test "should set the client name" do
      {:ok, client} = insert(:client) |> Clients.update_client(%{"name" => "New name"})

      assert client.name == "New name"
    end
  end
end
