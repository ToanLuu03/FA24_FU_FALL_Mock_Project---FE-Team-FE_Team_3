import { renderWithProviders } from "../../utils/test-utils";
import { fireEvent, waitFor } from "@testing-library/react";
import CreatePollPage from "./CreatePollPage";

describe("CreatePollPage", () => {
  it("render CreatePollPage", async () => {
    const { container } = renderWithProviders(<CreatePollPage />);
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  it("validation form", async () => {
    const { getByRole, getByText } = renderWithProviders(<CreatePollPage />);
    const submitButton = getByRole("button", { name: /Submit/i });
    fireEvent.submit(submitButton);
    await waitFor(() => {
      const userError = getByText(/Please input first option/i);
      const passwordError = getByText(/Please input first option/i);
      expect(userError).toBeTruthy();
      expect(passwordError).toBeTruthy();
    });
  });

  it("show errormessage when the option 1 field is empty", async () => {
    const { getByRole, findByText, getByPlaceholderText } = renderWithProviders(
      <CreatePollPage />
    );

    const opt1 = getByPlaceholderText(/Option One/i);
    const submitButton = getByRole("button", { name: /Submit/i });

    fireEvent.change(opt1, { target: { value: "optionone" } });
    fireEvent.submit(submitButton);

    const errorMessage = await findByText("Please input second option");
    expect(errorMessage).toBeTruthy();
  });

  it("show errormessage when the option 2 field is empty", async () => {
    const { getByRole, findByText, getByPlaceholderText } = renderWithProviders(
      <CreatePollPage />
    );

    const opt2 = getByPlaceholderText(/Option Two/i);
    const submitButton = getByRole("button", { name: /Submit/i });

    fireEvent.change(opt2, { target: { value: "optiontwo" } });
    fireEvent.submit(submitButton);

    const errorMessage = await findByText("Please input first option");
    expect(errorMessage).toBeTruthy();
  });
});
