defmodule TimerWeb.ClientControllerTest do
  use TimerWeb.ConnCase
  alias Timer.Repo
  alias Timer.Clients.Client
  alias TimerWeb.{ClientView, ErrorView}

  import Timer.Helpers.MapHelpers, only: [atomize_keys: 1]

  setup _context do
    %{conn: build_authenticated_conn()}
  end

  describe "index" do
    test "should render a list of clients belonging to the authenticated user", %{conn: conn} do
      with client <- insert(:client, user: conn.assigns[:current_user]),
           other_user_client <- insert(:client),
           conn <- get(conn, client_path(conn, :index)),
           %{"data" => response} <- json_response(conn, 200)
      do
        assert Enum.find(response, fn(response_client) -> response_client["id"] == client.id end)
        refute Enum.find(response, fn(response_client) -> response_client["id"] == other_user_client.id end)
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
      with conn <- post(conn, client_path(conn, :create, %{"client" => %{"name" => "Test client"}})),
           %{"id" => client_id} <- json_response(conn, 201)["data"],
           %{user: client_user} <- Repo.get!(Client, client_id) |> Repo.preload(:user)
      do
        assert conn.assigns[:current_user] == client_user
      end
    end
  end

  describe "delete" do
    test "should delete the client if the client belongs to the current user", %{conn: conn} do
      with client <- insert(:client, user: conn.assigns[:current_user]),
           conn <- delete(conn, client_path(conn, :delete, client.id)),
           %{"data" => response} <- json_response(conn, 200)
      do
        assert atomize_keys(response) == ClientView.render("client.json", %{client: client})
      end
    end

    test "should return an unauthorized exception and not delete the user if the user does not own the client", %{conn: conn} do
      with client <- insert(:client),
           conn <- delete(conn, client_path(conn, :delete, client.id))
      do
        assert json_response(conn, 401) == unauthorized_response()
      end
    end
  end
end
