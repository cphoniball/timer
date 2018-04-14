defmodule TimerWeb.AuthViewTest do
  use TimerWeb.ConnCase, async: true

  import Phoenix.View

  test "logged_in.json" do
    token = Faker.Lorem.characters()
    assert render(TimerWeb.AuthView, "logged_in.json", %{token: token}) == %{
      data: %{token: token}
    }
  end
end
