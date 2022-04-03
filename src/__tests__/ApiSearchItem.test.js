import { render, screen } from "@testing-library/react";
import { ApiSearchItem } from "../components";
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

describe("ApiSerarchItem component", () => {

    it("render coponent correctly", () => {
        render(
            <MemoryRouter>
                <ApiSearchItem data={["volumeInfo", "id"]} volumeInfo={{ title: "sometitle", authors: "test", publisher: "test", previewLink: "https://books.google.co.in/", imageLinks: "test", description: "test" }} id={2} />
            </MemoryRouter>);

        expect(screen.getByTestId("title").textContent).toBe("sometitle");
        expect(screen.getByTestId("title")).toHaveTextContent("sometitle");
    });
});