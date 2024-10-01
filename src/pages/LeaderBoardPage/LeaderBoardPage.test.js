import LeaderBoardPage from "./LeaderBoardPage";
import { renderWithProviders } from "../../utils/test-utils";

describe("LeaderBoard", () => {
  it("render LeaderBoard", async () => {
    const { container } = renderWithProviders(<LeaderBoardPage />);
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });
});
