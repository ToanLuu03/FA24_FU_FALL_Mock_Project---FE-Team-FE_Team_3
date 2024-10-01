import PollPage from "./PollPage";
import { renderWithProviders } from "../../utils/test-utils";

describe("PollPage", () => {
  it("render PollPage", async () => {
    const { container } = renderWithProviders(<PollPage />);
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });
});
