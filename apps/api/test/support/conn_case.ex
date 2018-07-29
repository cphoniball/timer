defmodule TimerWeb.ConnCase do
  @moduledoc """
  This module defines the test case to be used by
  tests that require setting up a connection.

  Such tests rely on `Phoenix.ConnTest` and also
  import other functionality to make it easier
  to build common datastructures and query the data layer.

  Finally, if the test case interacts with the database,
  it cannot be async. For this reason, every test runs
  inside a transaction which is reset at the beginning
  of the test unless the test case is marked as async.
  """

  use ExUnit.CaseTemplate

  using do
    quote do
      # Import conveniences for testing with connections
      use Phoenix.ConnTest
      import TimerWeb.Router.Helpers
      import Timer.Factory

      # The default endpoint for testing
      @endpoint TimerWeb.Endpoint

      def build_authenticated_conn() do
        with password <- Faker.Lorem.word(),
             user <- insert(:user, %{password: Comeonin.Bcrypt.hashpwsalt(password)}),
             {:ok, token, _claims} <- TimerWeb.Guardian.encode_and_sign(user)
        do
          build_conn()
          |> assign(:current_user, user)
          |> put_req_header("authorization", "Bearer " <> token)
        end
      end

      def unauthorized_response() do
        build_conn() |> TimerWeb.FallbackController.unauthorized() |> json_response(401)
      end
    end
  end


  setup tags do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Timer.Repo)
    unless tags[:async] do
      Ecto.Adapters.SQL.Sandbox.mode(Timer.Repo, {:shared, self()})
    end
    {:ok, conn: Phoenix.ConnTest.build_conn()}
  end
end
