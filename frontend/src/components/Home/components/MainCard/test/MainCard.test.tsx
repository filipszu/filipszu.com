import React from "react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import MainCard, {
  TestID,
} from "../../../../../components/Home/components/MainCard/MainCard";
import { TestID as HeaderTestID } from "../../../../../components/Home/components/Header/Header";
import { TestID as FooterTestID } from "../../../../../components/Home/components/Footer/Footer";
import { TestID as TypedTextID } from "../../../../../components/Home/components/TypedText/TypedText";

describe(`MainCard component responsibble for showing the Title, TypedText and Footer`, () => {
  test(`It will render correctly and match the snapshot.`, () => {
    const tree = renderer.create(<MainCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test(`[Given] it will render [Then] it will use the appropriate test-id: ${TestID}`, () => {
    render(<MainCard />);
    const el = screen.getByTestId(TestID);
    expect(el).toBeInTheDocument();
  });
  test(`[Given] it will render [Then] it will render the Title Component`, () => {
    render(<MainCard />);
    const el = screen.getByTestId(HeaderTestID);
    expect(el).toBeInTheDocument();
  });
  test(`[Given] it will render [Then] it will render the TypedText Component`, () => {
    render(<MainCard />);
    const el = screen.getByTestId(TypedTextID);
    expect(el).toBeInTheDocument();
  });
  test(`[Given] it will render [Then] it will render the Footer Component`, () => {
    render(<MainCard />);
    const el = screen.getByTestId(FooterTestID);
    expect(el).toBeInTheDocument();
  });
});
