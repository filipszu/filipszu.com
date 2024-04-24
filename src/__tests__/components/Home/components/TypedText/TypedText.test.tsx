import React from "react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import TypedText, {
  TestID,
} from "../../../../../components/Home/components/TypedText/TypedText";

const hardcodedCursor = "▮";
const mockedText = "The mocked text.";

describe(`TypedText component responsibble for animating the message`, () => {
  test(`It will render correctly and match the snapshot.`, () => {
    const tree = renderer
      .create(<TypedText text={mockedText} delay={500} interval={10} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test(`[Given] it will render [Then] it will use the appropriate test-id: ${TestID}`, () => {
    render(<TypedText text={mockedText} delay={500} interval={10} />);
    const el = screen.getByTestId(TestID);
    expect(el).toBeInTheDocument();
  });

  test(`[Given] it will render [Then] it will render the hardcoded cursor: ${hardcodedCursor}`, () => {
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
