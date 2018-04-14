defmodule TimerWeb.ErrorView do
  use TimerWeb, :view

  def render("401.json", _params) do
    %{data: %{message: "Unauthorized."}}
  end

  def render("404.json", _assigns) do
    %{data: nil, errors: %{message: "Resource not found.", detail: []}}
  end

  def render("422.json", %{detail: detail}) do
    %{data: nil, errors: %{message: "Invalid request.", detail: detail}}
  end

  def render("422.json", _assigns) do
    %{data: nil, errors: %{message: "Invalid request.", detail: []}}
  end

  def render("500.json", %{error: error}) do
    %{data: nil, errors: %{message: error, detail: []}}
  end

  def render("500.json", _assigns) do
    %{data: nil, errors: %{message: "Internal server error.", detail: []}}
  end

  # In case no render clause matches or no
  # template is found, let's render it as 500
  def template_not_found(_template, assigns) do
    render "500.json", assigns
  end
end
