import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Enzyme, { shallow } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BookDetails } from "../components";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode } from "react-dom";

Enzyme.configure({ adapter: new Adapter() });

describe("BookDetails component", () => {

    let container = null;
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });
    afterEach(() => { cleanup(); });

    it("render BookDetails", () => {
        render(<BookDetails data={"book"} book={{ title: "sometitle", subject: "test", author: "test", publisher: "test", publishedDate: "2021-02-23", isbn: "test", dewey: 0, description: "test" }} />);
        // const div = document.createElement("div");
        // ReactDOM.render(<Entry entry={{ title: "sometitle" }} />, div);
        // act(() => {
        //     render(<BookDetails />, container);
        // });
        // render(<BookDetails { mockBook, mockAction }/>);
    });
});