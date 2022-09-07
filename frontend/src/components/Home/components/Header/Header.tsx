import classes from "./Header.module.css";
export interface HeaderProps {
  title?: string;
  subtitle?: string;
}
export const TestID = "szu-header";
const Header = (props: HeaderProps) => {
  const title = props.title || "FiliPSZU";
  const subtitle = props.subtitle || "Software Engineer";
  return (
    <div className={classes.Logo} data-testid={TestID}>
      <h1>{title}</h1>
      <h4>{subtitle}</h4>
    </div>
  );
};
export default Header;
