defmodule TimerWeb.FallbackController do
  use Phoenix.Controller

  # Convenience methods for calling the other `call` methods in this module
  def not_found(conn), do: call(conn, {:error, :not_found})
  def unauthorized(conn), do: call(conn, {:error, :unauthorized})

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(TimerWeb.ChangesetView, "error.json", changeset: changeset)
  end

  def call(conn, {:error, :unauthorized}) do
    conn
    |> put_status(:unauthorized)
    |> render(TimerWeb.ErrorView, "401.json")
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> render(TimerWeb.ErrorView, "404.json")
  end

  def call(conn, {:error, :unprocessable_entity}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(TimerWeb.ErrorView, "422.json")
  end

  def call(conn, {:error, error}) do
    conn
    |> put_status(:internal_server_error)
    |> render(TimerWeb.ErrorView, "500.json", %{error: error})
  end
end
