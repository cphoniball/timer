defmodule AuthControllerTest do
  use TimerWeb.ConnCase

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

    test "should respond with an unauthorized response if the password is not correct" do

    end

    test "should respond with an unauthorized resopnse if the username does not exist" do

    end
  end

  describe "me" do
    test "should respond with the token's user if the token is valid" do

    end

    test "should respond with an unauthorized response if the token is not valid" do

    end

    test "should respond with a bad request response if the token does not exist" do

    end
  end
end
