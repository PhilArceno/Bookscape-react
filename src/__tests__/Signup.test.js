import { act, render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import Signup from "../pages/Signup";

describe("Signup component", () => {
    const onSubmit = jest.fn();
    beforeEach(() => {
        render(<Signup onSubmit = {onSubmit}/>);
    });
    afterEach(() => {
        cleanup();
    });

    test("render Signup page", () => {

        //username part dispaly
        const usernameElement = screen.getByTestId("username");
        expect(usernameElement).toBeInTheDocument();
        const usernameLable = screen.getByText("Username");
        expect(usernameLable).toBeInTheDocument();
        const usernameInput = screen.getByPlaceholderText("Ex. JohnDoe12");
        expect(usernameInput).toHaveTextContent("");

        //email part display
        const emailLable = screen.getByText("Email address");
        expect(emailLable).toBeInTheDocument();
        const emailInput = screen.getByPlaceholderText("Ex. JohnDoe@email.com");
        expect(emailInput.value).toMatch("");

    });

    it("test username input change", async () => {
        const usernameInput = screen.getByPlaceholderText("Ex. JohnDoe12");

        user.type(usernameInput, 'testing');
        await waitFor(() => expect(usernameInput).toHaveValue('testing'));
    });

    it("test email input change", async () => {
        const emailInput = screen.getByPlaceholderText("Ex. JohnDoe@email.com");

        user.type(emailInput, "testing123");
        await waitFor(() => expect(emailInput).toHaveValue('testing123'));
    });

    it("test wrong email pattern input give an error message", async () => {
        const emailInput = screen.getByPlaceholderText("Ex. JohnDoe@email.com");
        const emailErrorMessage = screen.getByTestId("email-errormessage");

        user.type(emailInput, "testing123");
        await waitFor(() => expect(onSubmit).not.toBeCalled());
        await waitFor(() => expect(emailErrorMessage).toBeInTheDocument());
    });

    it("all the infomation are correct can call the sign up button", () => {
        const usernameInput = screen.getByPlaceholderText("Ex. JohnDoe12");
        const emailInput = screen.getByPlaceholderText("Ex. JohnDoe@email.com");
        const phoneInput = screen.getByPlaceholderText("Ex. 514-123-4567");
        const passwordInput = screen.getByTestId("passwordInput");
        const confirmPasswordInput = screen.getByTestId("confirmPasswordInput");

        const signUpbtn = screen.getByTestId("signUpbtn");

        user.type(usernameInput, "test123");
        user.type(emailInput, "test@123.com");
        user.type(phoneInput, "514-777-7777");
        user.type(passwordInput, "test123");
        user.type(confirmPasswordInput, "test123");

        user.click(signUpbtn);

        //expect(onSubmit).toBeCalled();

    });

    // it("submit form", () => {
    //     const mockSubmit = jest.fn();
    //     const {getByTestId } = render(<Signup handleSubmit={mockSubmit}/>);

    //     fireEvent.click(getByTestId("signUp"));

    //     expect(mockSubmit).toHaveBeenCalled();
    // });
});
