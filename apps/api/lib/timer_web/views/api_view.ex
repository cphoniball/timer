defmodule TimerWeb.ApiView do
  use TimerWeb, :view

  import Plug.Conn.Status, only: [code: 1]

  @moduledoc """
  Generic view that all API responses should be wrapped in to support consistent
  responses from the API
  """
  def render("not_found.json", %{message: message}) do
    %{
      status: code(:not_found),
      data: nil,
      errors: %{
        message: message,
        detail: []
      }
    }
  end

  def render("success.json", %{data: data, status: status}) do
    %{status: code(status), data: data, errors: nil}
  end

  def render("success.json", %{data: data}) do
    render("success.json", %{data: data, status: :ok})
  end
end