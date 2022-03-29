import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login, { Heading, FormLabel, Input } from "../pages/Login";
import { MemoryRouter } from 'react-router-dom';

describe("Login page", () => {
    afterEach(() => { cleanup(); });

    it("Input shows default value", () => {
        act(() => {
            render(
                <MemoryRouter>
                    <Login />
                </MemoryRouter>);
        });
        const email = screen.getByTestId("email");
        expect(email.value).toMatch("");
        expect(email).toHaveTextContent("");
        fireEvent.change(email,{target:{value:"testing"}});
        expect(email.value).toMatch("testing");
    });

    //it("")
})

