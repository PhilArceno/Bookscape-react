import { render, screen, fireEvent } from "@testing-library/react";
import { SearchAPIBook } from "../components";
import Enzyme, { shallow } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe("SearchAPIBook component", () => {
    it("render SearchAPIBook correctly", () => {

        render(<SearchAPIBook />);
        const searchInput = screen.getByTestId("searchInput");
        //const searchbtn = screen.getByTestId("searchbtn");
        fireEvent.change(searchInput, { target: { value: "test123" } })
        expect(searchInput.value).toBe("test123");
    });

    // it("", () => {
        
    //     const wrapper = shallow(<SearchAPIBook onSubmit={mockSubmit}/>);
    //     const mockSubmit = wrapper.instance().handleSubmit = jest.fn();
    //     wrapper.instance().forceUpdate()
    //     wrapper.update()
    //     wrapper.find('#searchbtn').simulate('click')
    //     expect(wrapper.instance().handleSubmit).toHaveBeenCalled()
    // });

});