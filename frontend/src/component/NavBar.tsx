import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { appConfig } from '../data/appConfig';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AccountCircle, ShoppingCart } from '@mui/icons-material';
import { Badge, Container, Menu, MenuItem } from '@mui/material';
import * as localforage from 'localforage';
import { removeSession } from '../redux/store';

const drawerWidth = 240;
const navItems = ['Products'];

export default function Navbar() {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state?.user);
  const [shakeCart, setShakeCart] = React.useState({
    quantity: 0,
    shake: false,
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    const answer = confirm('Are you sure you want to logout?');
    if (answer) {
      await localforage.removeItem('authSession');
      await localforage.removeItem('cart');
      await localforage.removeItem('accessToken');
      dispatch(removeSession());
    } else {
      setAnchorEl(null);
    }
  };

  React.useEffect(() => {
    if (shakeCart.quantity < auth.cart?.length) {
      setShakeCart({ quantity: auth.cart?.length, shake: true });
      setTimeout(() => {
        setShakeCart((oldState) => ({
          ...oldState,
          shake: false,
        }));
      }, 500);
    }
  }, [auth.cart]);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {appConfig.title}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <AppBar
        color="transparent"
        component="nav"
        position="static"
        elevation={1}
      >
        <Container maxWidth="md">
          <Toolbar variant="dense">
            <IconButton
              sx={{ mr: 2, display: { sm: 'none' } }}
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
              }}
            >
              <Link to="/" style={{ color: 'inherit' }}>
                {appConfig.title}
              </Link>
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Link to={`/${item?.toLowerCase()}`}>
                  <Button
                    sx={{ textTransform: 'capitalize' }}
                    size="small"
                    key={item}
                  >
                    {item?.toLowerCase()}
                  </Button>
                </Link>
              ))}
            </Box>
            {auth?.authenticated ? (
              <>
                <IconButton color="inherit" onClick={handleClick}>
                  <AccountCircle />
                </IconButton>
                {/* <ShakeHorizontal fixed={false} fixedStop="false" freez={true}> */}
                <Link to="/cart" style={{ color: 'inherit' }}>
                  <IconButton color="inherit">
                    <Badge badgeContent={auth?.cart?.length} color="secondary">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </Link>
                {/* </ShakeHorizontal> */}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <MenuItem onClick={() => navigate('/profile')}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Link to="/login">
                <a>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      // color: '#fff',
                      borderColor: '#fff',
                      ml: 1,
                    }}
                  >
                    Login
                  </Button>
                </a>
              </Link>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </div>
  );
}
