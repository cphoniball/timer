defmodule AuthControllerTest do
  use TimerWeb.ConnCase

  import Plug.Conn, only: [put_req_header: 3]
  import Phoenix.View

  alias TimerWeb.Guardian

  setup _context do
    password = Faker.Lorem.word()
    user = insert(:user, %{password: Comeonin.Bcrypt.hashpwsalt(password)})
    %{conn: build_conn(), user: user, password: password}
  end

  describe "login" do
    test "should respond with an access token if the username password combination is correct", %{conn: conn, user: user, password: password} do
      %{"data" => %{"token" => token}} = conn
      |> post(auth_path(conn, :login), %{email: user.email, password: password})
      |> json_response(200)

      {:ok, resource, _claims} = Guardian.resource_from_token(token)
      assert resource.id === user.id
    end

    test "should respond with an unauthorized response if the password is not correct", %{conn: conn, user: user} do
      conn
      |> post(auth_path(conn, :login), %{email: user.email, password: Faker.Lorem.words(3) |> Enum.join(" ")})
      |> response(401)
      |> assert_unauthorized_response()
    end

    test "should respond with an unauthorized resopnse if the username does not exist", %{conn: conn} do
      conn
      |> post(auth_path(conn, :login), %{email: Faker.Internet.email(), password: Faker.Lorem.word()})
      |> response(401)
      |> assert_unauthorized_response()
    end
  end

  describe "me" do
    setup %{conn: conn, user: user, password: password} do
      %{"data" => %{"token" => token}} = conn
      |> post(auth_path(conn, :login), %{email: user.email, password: password})
      |> json_response(200)

      %{conn: conn, user: user, token: token}
    end

    test "should respond with the token's user if the token is valid", %{conn: conn, user: user, token: token} do
      %{"data" => %{"id" => id}} = conn
      |> put_req_header("authorization", "Bearer " <> token)
      |> get(auth_path(conn, :me))
      |> json_response(200)

      assert id == user.id
    end

    test "should respond with an unauthorized response if the token is not valid", %{conn: conn, token: token} do
      conn
      |> put_req_header("authorization", "Bearer " <> token <> "invalidtokenstring")
      |> get(auth_path(conn, :me))
      |> response(401)
      |> assert_unauthorized_response()
    end

    test "should respond with a bad request response if the token does not exist", %{conn: conn} do
      response = conn |> get(auth_path(conn, :me)) |> response(422)

      assert response == Poison.encode!(render(TimerWeb.ErrorView, "422.json", %{}))
    end
  end

  defp assert_unauthorized_response(response) do
    assert response == Poison.encode!(render(TimerWeb.ErrorView, "401.json", %{}))
  end
end
