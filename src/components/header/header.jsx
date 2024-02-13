import { Link } from "react-router-dom";
import GuamaIcon from "../../assets/guama-icon.svg";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

const Header = (props) => {
  const { backButton } = props;

  return (
    <Navbar>
      <NavbarBrand>
        <img
          className="pt-3"
          src={GuamaIcon}
          alt="logo"
          width="70"
          height="40"
        />
        <p className="font-semibold text-inherit text-2xl ml-3 mt-2 text-gray-700 hidden sm:block">
          Guama transactions
        </p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          {backButton ? (
            <Link to="/transactions">
              <Button color="secondary" variant="light">
                Go back
              </Button>
            </Link>
          ) : (
            <Button color="secondary">Make a payment</Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
