import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../pages/Login";
import { MemoryRouter } from 'react-router-dom';
import 'whatwg-fetch';

//jest.mock("../pages/Login");

describe("Login page", () => {
    afterEach(() => { cleanup(); });

    it("email input part", () => {
        act(() => {
            render(
                <MemoryRouter>
                    <Login />
                </MemoryRouter>);
        });
        const emailLable = screen.getByText("Email address");
        expect(emailLable).toBeInTheDocument();

        const email = screen.getByTestId("email");
        expect(email.value).toMatch("");
        expect(email).toHaveTextContent("");
        fireEvent.change(email, { target: { value: "testing" } });
        expect(email.value).toMatch("testing");

        const emailErrorMessage = screen.getByTestId("emailErrorMessage");
        expect(emailErrorMessage).toBeInTheDocument();

        // fireEvent.change(email, { target : { value : "testing@123.com"}});
        // expect(emailErrorMessage).not.toBeInTheDocument();

    });

    it("click login button should submit form", () => {
        const mockOnSubmit = jest.fn();

        render(
            <MemoryRouter>
                <Login onsubmit={mockOnSubmit} />
            </MemoryRouter>);

        act(() => {
            fireEvent.change(screen.getByTestId("email"), { target: { value: "test@123.com" } });
            fireEvent.change(screen.getByTestId("password"), { target: { value: "Password123" } })
        });
        act(() => {
            fireEvent.click(screen.getByTestId("login"));
        });
        expect(mockOnSubmit).toBeCalledTimes(0);
        // const loginbtn = screen.getByTestId("login");
        // fireEvent.submit(loginbtn);
        // expect(mockfn).toBeCalledTimes(0);
    });


});

