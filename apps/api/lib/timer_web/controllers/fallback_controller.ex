defmodule TimerWeb.FallbackController do
  use Phoenix.Controller

  # Convenience methods for calling the other `call` methods in this module
  def not_found(conn), do: call(conn, {:error, :not_found})
  def unauthorized(conn), do: call(conn, {:error, :unauthorized})

  @doc """
  Fallback method for results of failed changeset operations.
  """
  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(TimerWeb.ChangesetView, "error.json", changeset: changeset)
  end

  @doc """
  Falback method for endpoints where the user is not authorized
  """
  def call(conn, {:error, :unauthorized}) do
    conn
    |> put_status(:unauthorized)
    |> render(TimerWeb.ErrorView, "401.json")
  end

  @doc """
  Fallback method for resource endpoints when that resource is not found.
  """
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
