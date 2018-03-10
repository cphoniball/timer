defmodule TimerWeb.ErrorViewTest do
  use TimerWeb.ConnCase, async: true

  # Bring render/3 and render_to_string/3 for testing custom views
  import Phoenix.View

  test "renders 404.json" do
    assert render(TimerWeb.ErrorView, "404.json", []) == %{
      data: nil,
      errors: %{
        message: "Resource not found.",
        detail: []
      }
    }
  end

  test "render 500.json" do
    assert render(TimerWeb.ErrorView, "500.json", []) == %{
      data: nil,
      errors: %{
        message: "Internal server error.",
        detail: []
      }
    }
  end

  test "render any other" do
    assert render(TimerWeb.ErrorView, "505.json", []) == %{
      data: nil,
      errors: %{
        message: "Internal server error.",
        detail: []
      }
    }
  end
end
