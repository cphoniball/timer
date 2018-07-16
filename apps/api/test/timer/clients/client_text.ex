defmodule Timer.ClientTest do
  use Timer.DataCase
  alias Timer.Clients.Client

  describe "client belongs to a user" do
    test "should be able to access a client's user with client.user" do
      with user <- insert(:user),
           client <- insert(:client, %{user: user})
      do
        assert client.user == user
      end
    end
  end
end
