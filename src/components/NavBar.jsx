import Link from 'next/link';
import { useEffect, useState } from 'react';
import { InputAdornment, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Search as SearchIcon, ShoppingCart as ShoppingCartIcon, HelpOutline as HelpOutlineIcon, Home as HomeIcon, AccountCircle as AccountCircleIcon, Menu as MenuIcon } from '@mui/icons-material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { productImageMapping } from './productsImageMapping';
import Fuse from 'fuse.js';

const Navbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility on small screens

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/getUser`);
        setUser(res.data.user[0]);
        // Check if user exists and has a Customer_id before fetching orders
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData()
  }, []);

  // Fuse.js options for search
  const fuseOptions = {
    includeScore: true,
    keys: ['name'],
  };

  // Initialize Fuse.js instance with product names
  const fuse = new Fuse(Object.keys(productImageMapping).map(name => ({ name })), fuseOptions);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Perform search using Fuse.js
    const results = fuse.search(value);
    setSearchResults(results);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Redirect to search results page with the search query
    router.push(`/search?q=${encodeURIComponent(searchValue)}`);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="rounded-full w-4/5 mx-auto my-8 bg-slate-500" style={{
      background: 'rgba(255, 255, 255, 0.2)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    }}>
      <div className="flex justify-between items-center p-4">
        {/* Hamburger Menu Button */}
        <IconButton className="text-gray-700 md:hidden" onClick={toggleMenu}>
          <MenuIcon />
        </IconButton>

        {/* Logo or Branding */}
        <Link href="/">
          <div className="flex items-center text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full">
            <HomeIcon />
            <span className="ml-2 hidden sm:inline">Home</span>
          </div>
        </Link>

        {/* Search Form */}
        <div className="flex-grow-2 relative mx-2">
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 rounded-full"
              placeholder="Search"
              style={{ color: 'black' }} // Change the color of the input text to black
            />
            <IconButton type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded-full absolute right-0 top-0 bottom-0">
              <SearchIcon />
            </IconButton>
          </form>
        </div>

        {/* Desktop Menu Items */}
        <ul className="hidden md:flex justify-between items-center w-2/5">
          <li className="mx-2">
            <Link href="/cart">
              <div className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full">
                <ShoppingCartIcon />
                <span className="ml-2 hidden sm:inline">Cart</span>
              </div>
            </Link>
          </li>
          <li className="mx-2">
            {user ? (
              <Link href={"/profile/"+user.Email}>
                <div className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full">
                  <AccountCircleIcon />
                  <span className="ml-2 hidden sm:inline">Profile</span>
                </div>
              </Link>
            ) : (
              <Link href="/signin">
                <div className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full">
                  <span className="ml-2 hidden sm:inline">Sign In</span>
                </div>
              </Link>
            )}
          </li>
          <li className="mx-2">
            <Link href="/help">
              <div className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full">
                <HelpOutlineIcon />
                <span className="ml-2 hidden sm:inline">Help</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      {/* Responsive Menu for Small Screens */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col items-center">
          <li className="mx-2 my-2">
            <Link href="/cart">
              <div className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full">
                <ShoppingCartIcon />
                <span className="ml-2">Cart</span>
              </div>
            </Link>
          </li>
          <li className="mx-2 my-2">
            {user ? (
              <Link href={"/profile/"+user.Email}>
                <div className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full">
                  <AccountCircleIcon />
                  <span className="ml-2">Profile</span>
                </div>
              </Link>
            ) : (
              <Link href="/signin">
                <div className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full">
                  <span className="ml-2">Sign In</span>
                </div>
              </Link>
            )}
          </li>
          <li className="mx-2 my-2">
            <Link href="/help">
              <div className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full">
                <HelpOutlineIcon />
                <span className="ml-2">Help</span>
              </div>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
