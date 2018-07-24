defmodule TimerWeb.ClientControllerTest do
  use TimerWeb.ConnCase
  alias Timer.Repo
  alias Timer.Clients.Client

  setup _context do
    %{conn: build_authenticated_conn()}
  end

  describe "index" do
    test "should render a list of clients belonging to the authenticated user", %{conn: conn} do
      with client <- insert(:client, user: conn.assigns[:current_user]),
           conn <- get(conn, client_path(conn, :index)),
           %{"data" => response} <- json_response(conn, 200)
      do
        assert Enum.find(response, fn(response_client) -> response_client["name"] == client.name end)
      end
    end
  end

  describe "create" do
    test "should persist a client with the data contained in the request body", %{conn: conn} do
      conn = post(conn, client_path(conn, :create, %{"client" => %{"name" => "Test client"}}))
      response = json_response(conn, 201)["data"]

      assert response == %{
        "id" => response["id"],
        "name" => "Test client"
      }
    end

    test "should create a client that belongs to the authenticated user", %{conn: conn} do
      with conn = post(conn, client_path(conn, :create, %{"client" => %{"name" => "Test client"}})),
           %{"id" => client_id} = json_response(conn, 201)["data"],
           %{user: client_user} = Repo.get!(Client, client_id) |> Repo.preload(:user)
      do
        assert conn.assigns[:current_user] == client_user
      end
    end
  end
end
