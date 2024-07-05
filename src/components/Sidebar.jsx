import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Card className="h-full w-full max-w-[20rem] p-4 shadow-2xl rounded-none shadow-blue-gray-300">
      <div className="p-4 mb-2">
        <Typography variant="h5" color="blue-gray">
          Invoice App
        </Typography>
      </div>
      <List>
        <Link to="/">
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="w-5 h-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <Link to="/invoices">
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="w-5 h-5" />
            </ListItemPrefix>
            Invoices
          </ListItem>
        </Link>
        <Link to="/products">
          <ListItem>
            <ListItemPrefix>
              <ShoppingBagIcon className="w-5 h-5" />
            </ListItemPrefix>
            Products
          </ListItem>
        </Link>
      </List>
    </Card>
  );
};

export default Sidebar;
