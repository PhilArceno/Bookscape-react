import { render, screen, cleanup,fireEvent, getAllByText } from "@testing-library/react";
import '@testing-library/jest-dom'
import Login from "../pages/Login";
import * as ReactRouterDom from "react-router-dom";
import { shallow } from "enzyme";
import { act } from 'react-dom/test-utils';
import { useNavigate } from 'react-router-dom';

describe("Login component", () => {
    afterEach(() => {
        cleanup();
    });

    let container;

    test("render form",  () => {
        act(() => {
            ReactDOM.render(<Login />, container);
          });
        jest.mock('react-router-dom', () => ({
            useNavigate: jest.fn(() => jest.fn),
        }));
        const wrapper = shallow(<Login />);

        const reuslt = wrapper.find(getAllByText("Email address"));

        //const emailElement = screen.getByLabelText("Email address");
        expect(reuslt).toBeInTheDocument();
    });

    // test("input email", () => {
    //     const { getByTestId } = render(<Login />);
    //     const email = getByTestId("email");

    //     expect(email.textContent).toBe("");
    // });

    // it("submit form", () => {
    //     const mockSubmit = jest.fn();
    //     const {getByTestId } = render(<Login handleSubmit={mockSubmit}/>);

    //     fireEvent.click(getByTestId("login"));

    //     expect(mockSubmit).toHaveBeenCalled();
    // });
});
