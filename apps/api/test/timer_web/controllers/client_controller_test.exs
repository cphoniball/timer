defmodule TimerWeb.ClientControllerTest do
  use TimerWeb.ConnCase
  alias Timer.Repo
  alias Timer.Clients.Client

  alias TimerWeb.Guardian

  setup _context do
    %{conn: build_authenticated_conn()}
  end

  describe "index" do
    test "should render a list of clients belonging to the authenticated user", %{conn: conn} do
      authenticated_user = Guardian.Plug.current_token(conn) |> Guardian.resource_from_token()
      client = insert(:client, user: authenticated_user) # client that belongs to the authenticated user
      conn = get(conn, client_path(conn, :index))
      response = json_response(conn, 200)["data"]

      assert Enum.member?(response, client)
    end
  end

  describe "create" do
    test "should persist a client with the data contained in the request body", %{conn: conn} do
      conn = post(conn, client_path(conn, :create, %{"client" => %{"name" => "Test client"}}))
      response = json_response(conn, 201)["data"]

      assert response = %{
        "id" => response["id"],
        "name" => "Test client"
      }
    end

    test "created client should belong to the authenticated user", %{conn: conn} do
      authenticated_user = Guardian.Plug.current_token(conn) |> Guardian.resource_from_token()
      conn = post(conn, client_path(conn, :create, %{"client" => %{"name" => "Test client"}}))
      %{"id" => client_id} = json_response(conn, 201)["data"]
      %{user: client_user} = Repo.get!(Client, client_id) |> Repo.preload(:user)

      assert authenticated_user = client_user
    end
  end
end
