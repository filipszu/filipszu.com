import React from "react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import TypedText from "../../../../../components/Home/components/TypedText/TypedText";

const hardcodedCursor = "▮";
const mockedText = "The mocked text.";

describe(`TypedText component responsibble for animating the message`, () => {
  test(`It will render correctly and match the snapshot.`, () => {
    const tree = renderer
      .create(<TypedText text={mockedText} delay={500} interval={10} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test(`[Given] It will render [Then] it will render a cursor.`, () => {
    render(<TypedText text={mockedText} delay={500} interval={10} />);
    const el = screen.getByText(hardcodedCursor);
    expect(el).toBeInTheDocument();
  });

  test(`[Given] a text prop [Then] it will render it after the animation.`, async () => {
    render(<TypedText text={mockedText} delay={500} interval={10} />);
    const el = await screen.findByText(mockedText);
    expect(el).toBeInTheDocument();
  });
});
