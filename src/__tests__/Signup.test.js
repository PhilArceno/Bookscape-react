import { render, screen, cleanup,fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import Signup from "../pages/Signup";

describe("Signup component", () => {
    afterEach(() => {
        cleanup();
    });

    test("render form", () => {
        render(<Signup />);
        const usernameElement = screen.getByTestId("username");
        expect(usernameElement).toBeInTheDocument();
    });

    test("input username", () => {
        const { getByTestId } = render(<Signup />);
        const inputUsername = getByTestId("usernameInput");

        expect(inputUsername.textContent).toBe("");
    });

    it("submit form", () => {
        const mockSubmit = jest.fn();
        const {getByTestId } = render(<Signup handleSubmit={mockSubmit}/>);

        fireEvent.click(getByTestId("signUp"));

        expect(mockSubmit).toHaveBeenCalled();
    });
});
