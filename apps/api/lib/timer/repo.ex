defmodule Timer.Repo do
  use Ecto.Repo, otp_app: :timer

  @doc """
  Dynamically loads the repository url from the
  DATABASE_URL environment variable.
  """
  def init(_, config) do
    url = System.get_env("DATABASE_URL")
    config = if url, do: [url: url] ++ config, else: Confex.Resolver.resolve!(config)

    unless config[:database] do
      raise "Set DB_NAME environment variable!"
    end

    {:ok, config}
  end
end
