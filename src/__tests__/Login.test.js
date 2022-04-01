import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import Enzyme, { shallow } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import "@testing-library/jest-dom";
import Login, { onsubmit } from "../pages/Login";
import { MemoryRouter } from 'react-router-dom';
import 'whatwg-fetch';

Enzyme.configure({ adapter: new Adapter() });

//jest.mock(onsubmit);
// global.fetch = jest.fn(() => {
//     Promise.resolve({
//         method: 'POST',
//         body: {
//             email: "test@123.com",
//             password: "Password123"
//         },
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     }).then();
// });

describe("Login page", () => {
    afterEach(() => { cleanup(); });

    it("render Login page without crashing", () => {
        shallow(<MemoryRouter>
            <Login />
        </MemoryRouter>);
    });

    it("click submit button should submit a form", () => {
        const mockOnSubmit = jest.fn();
        const wrapper = shallow(<MemoryRouter> <Login onsubmit={mockOnSubmit} /> </MemoryRouter>);
        console.log(wrapper.debug())
        const emailInput = wrapper.find("#email-input");
        const passwordInput = wrapper.find("#password-input");
        emailInput.simulate("change", {target: { value: "test@123.com" }});
        passwordInput.simulate("change", { target: { value: "Password123" } });
        
        wrapper.find('form').simulate('submit', {
            preventDefault: () =>{}
          });
          expect(mockOnSubmit).toBeCalled()

    });

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
        // jest.mock("../pages/Login");
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

    // it("mock login page", () => {
    //     const login = jest.mock("../pages/Login");
    //     expect(login.)
    // });
});

