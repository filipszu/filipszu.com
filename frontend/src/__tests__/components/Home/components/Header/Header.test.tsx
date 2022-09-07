import React from "react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import Header from "../../../../../components/Home/components/Header/Header";

const hardcodedTitle = "FiliPSZU";
const hardcodedSubtitle = "Software Engineer";
const mockedTitle = "Mocked Title";
const mockedSubtitle = "Mocked Subtitle";

describe(`Header component responsibble for rendering ${hardcodedTitle} ${hardcodedSubtitle}`, () => {
  test(`It will render correctly and match the snapshot.`, () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test(`[Given] no title prop [Then] it will render the hardcoded title: ${hardcodedTitle}`, () => {
    render(<Header />);
    const el = screen.getByText(hardcodedTitle);
    expect(el).toBeInTheDocument();
  });
  test(`[Given] a title prop [Then] it will render the passed title: ${mockedTitle}`, () => {
    render(<Header title={mockedTitle} />);
    const el = screen.getByText(mockedTitle);
    expect(el).toBeInTheDocument();
  });
  test(`[Given] no subtitle prop [Then] it will render the hardcoded subtitle: ${hardcodedSubtitle}`, () => {
    render(<Header />);
    const el = screen.getByText(hardcodedSubtitle);
    expect(el).toBeInTheDocument();
  });
  test(`[Given] a subtitle prop [Then] it will render the passed subtitle: ${mockedSubtitle}`, () => {
    render(<Header subtitle={mockedSubtitle} />);
    const el = screen.getByText(mockedSubtitle);
    expect(el).toBeInTheDocument();
  });
});
