defmodule TimerWeb.ChangesetView do
  use TimerWeb, :view

  def translate_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, &translate_error/1)
  end

  def render("error.json", %{changeset: changeset}) do
    %{
      data: nil,
      errors: %{
        message: "Could not update resource",
        detail: translate_errors(changeset)
      }
    }
  end
end
