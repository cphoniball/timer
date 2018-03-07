defmodule TimerWeb.UserControllerTest do
  use TimerWeb.ConnCase

  # TODO: Clean up the repetitive result check below

  test "index renders a list of todos" do
    conn = build_conn()
    user = insert(:user)

    conn = get(conn, user_path(conn, :index))

    assert json_response(conn, 200) == %{
      "status" => 200,
      "data" => [%{
        "id" => user.id,
        "name" => user.name,
        "email" => user.email
      }],
      "errors" => nil
    }
  end

  test "show renders a single user" do
    conn = build_conn()
    user = insert(:user)

    conn = get(conn, user_path(conn, :show, user.id))

    assert json_response(conn, 200) == %{
      "status" => 200,
      "data" => %{
        "id" => user.id,
        "name" => user.name,
        "email" => user.email
      },
      "errors" => nil
    }
  end

  test "create saves a user and renders them" do
    conn = build_conn()
    user = %{"name" => "Testing", "email" => Faker.Internet.email(), "password" => "test"}

    conn = post(conn, user_path(conn, :create, user))

    response = json_response(conn, 201)

    assert response == %{
      "status" => 201,
      "data" => %{
        "id" => response["data"]["id"],
        "name" => user["name"],
        "email" => user["email"]
      },
      "errors" => nil
    }
  end
end
