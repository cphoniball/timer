defmodule TimerWeb.UserControllerTest do
  use TimerWeb.ConnCase

  # TODO: Move the render matching into view tests

  setup _context do
    %{
      conn: build_conn(),
      user: insert(:user)
    }
  end

  test "index renders a list of users", %{conn: conn, user: user} do
    conn = get(conn, user_path(conn, :index))

    assert json_response(conn, 200)["data"] == [%{
      "id" => user.id,
      "name" => user.name,
      "email" => user.email
    }]
  end

  test "show renders a single user", %{conn: conn, user: user} do
    conn = get(conn, user_path(conn, :show, user.id))

    assert json_response(conn, 200)["data"] == %{
      "id" => user.id,
      "name" => user.name,
      "email" => user.email
    }
  end

  test "create saves a user and renders them", %{conn: conn} do
    user = %{"name" => "Testing", "email" => Faker.Internet.email(), "password" => "test"}

    conn = post(conn, user_path(conn, :create, %{"user" => user}))

    response = json_response(conn, 201)["data"]

    assert response == %{
      "id" => response["id"],
      "name" => user["name"],
      "email" => user["email"]
    }
  end

  test "delete deletes a user and returns their id", %{conn: conn, user: user} do
    conn = delete(conn, user_path(conn, :delete, user.id))

    assert json_response(conn, 200)["data"] == %{
      "id" => user.id,
      "name" => user.name,
      "email" => user.email
    }
  end
end
