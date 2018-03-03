defmodule TimerWeb.UserControllerTest do
  use TimerWeb.ConnCase

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
end
