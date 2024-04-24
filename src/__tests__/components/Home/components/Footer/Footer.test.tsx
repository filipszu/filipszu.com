import React from "react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import Footer, {
  TestID,
} from "../../../../../components/Home/components/Footer/Footer";

const hardcodedLinks = {
  twitter: { label: "@filipszu", url: "https://twitter.com/filipszu" },
  github: { label: "GitHub", url: "https://github.com/filipszu" },
  stackOverflow: {
    label: "StackOverflow",
    url: "https://stackoverflow.com/users/9680496/filip-szulczewski",
  },
  linkedIn: { label: "LinkedIn", url: "https://www.linkedin.com/in/filipszu" },
};

describe(`Footer component responsibble for rendering the links to other platforms.`, () => {
  test(`It will render correctly and match the snapshot.`, () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test(`[Given] it will render [Then] it will use the appropriate test-id: ${TestID}`, () => {
    render(<Footer />);
    Object.values(hardcodedLinks).forEach((link) => {
      const el = screen.getByTestId(TestID);
      expect(el).toBeInTheDocument();
    });
  });
  test(`[Given] the page will render [Then] there will be a link to all of the hardcoded websites with appropriate labels`, () => {
    render(<Footer />);
    Object.values(hardcodedLinks).forEach((link) => {
      const el = screen.getByText(link.label);
      expect(el).toBeInTheDocument();
    });
  });
  test(`[Given] the page will render [Then] there will be a link to all of the hardcoded websites with appropriate urls`, () => {
    render(<Footer />);

    Object.values(hardcodedLinks).forEach((link) => {
      expect(screen.getByRole("link", { name: link.label })).toHaveAttribute(
        "href",
        link.url
      );
    });
  });
});
