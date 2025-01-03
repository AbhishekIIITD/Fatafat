import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon, Close as CloseIcon, ShoppingCart as ShoppingCartIcon, HelpOutline as HelpOutlineIcon, Home as HomeIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import axios from 'axios';
import { useRouter } from 'next/router';
import Fuse from 'fuse.js';
import { productImageMapping } from './productsImageMapping';

const Navbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/getUser`);
        setUser(res.data.user[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const fuseOptions = {
    includeScore: true,
    keys: ['name'],
  };

  const fuse = new Fuse(Object.keys(productImageMapping).map(name => ({ name })), fuseOptions);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    const results = fuse.search(value);
    setSearchResults(results);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchValue)}`);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <nav
      className="mx-auto my-8 p-4 px-8 max-w-5xl bg-slate-100 shadow-lg flex items-center justify-between rounded-full md:w-4/5 w-full"
    >
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold text-green-800">
          <Link href="/">Fatafat</Link>
        </div>
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            className="px-4 py-2 rounded-full border w-64"
            placeholder="Search"
            style={{ color: 'black' }}
          />
          <IconButton
            type="submit"
            className="absolute right-0 top-0 bottom-0 bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded-full"
          >
            <SearchIcon />
          </IconButton>
        </form>
      </div>
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/">
          <div className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full">
            <HomeIcon />
            <span className="ml-2">Home</span>
          </div>
        </Link>
        <Link href="/cart">
          <div className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full">
            <ShoppingCartIcon className="text-green-600" />
            <span className="ml-2">Cart</span>
          </div>
        </Link>
        {user ? (
          <Link href={"/profile/" + user.Email}>
            <div className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full">
              <AccountCircleIcon />
              <span className="ml-2">Profile</span>
            </div>
          </Link>
        ) : (
          <Link href="/signin">
            <div className="flex items-center text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-full">
              <span className="ml-2">Sign In</span>
            </div>
          </Link>
        )}
        <Link href="/help">
          <div className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full">
            <HelpOutlineIcon />
            <span className="ml-2">Help</span>
          </div>
        </Link>
      </div>
      <IconButton
        className="md:hidden"
        onClick={toggleDrawer}
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <div className="w-64 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Menu</h2>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </div>
          <List>
            <ListItem button onClick={() => router.push('/')}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => router.push('/cart')}>
              <ListItemText primary="Cart" />
            </ListItem>
            {user ? (
              <ListItem button onClick={() => router.push(`/profile/${user.Email}`)}>
                <ListItemText primary="Profile" />
              </ListItem>
            ) : (
              <ListItem button onClick={() => router.push('/signin')}>
                <ListItemText primary="Sign In" />
              </ListItem>
            )}
            <ListItem button onClick={() => router.push('/help')}>
              <ListItemText primary="Help" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
