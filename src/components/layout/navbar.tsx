import { LockIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { SignedIn, SignedOut } from '../auth/session-based-components';
import Logout from './logout';

const navItems = [
  {
    label: 'Home',
    href: '/',
    type: 'public',
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    type: 'protected',
  },
  {
    label: 'Login',
    href: '/login',
    type: 'auth',
  },
  {
    label: 'Signup',
    href: '/signup',
    type: 'auth',
  },
] as const;

const Navbar = () => {
  return (
    <nav className='flex justify-between py-5 max-w-5xl container'>
      <div>
        <Link href='/' className='flex items-center space-x-2'>
          <LockIcon />
          <span>Auth</span>
        </Link>
      </div>
      <ul className='flex space-x-6'>
        <ul className='flex space-x-6'>
          {navItems.map((navItem, index) => (
            <NavItem key={index} {...navItem} />
          ))}
        </ul>
        <SignedIn>
          <Logout />
        </SignedIn>
      </ul>
    </nav>
  );
};

type NavItem = {
  label: string;
  href: string;
  type: 'public' | 'protected' | 'auth';
};

const NavItem = ({ href, label, type }: NavItem) => {
  if (type === 'protected') {
    return (
      <SignedIn>
        <li>
          <Link href={href}>{label}</Link>
        </li>
      </SignedIn>
    );
  }

  if (type === 'auth') {
    return (
      <SignedOut>
        <li>
          <Link href={href}>{label}</Link>
        </li>
      </SignedOut>
    );
  }

  return (
    <li>
      <Link href={href}>{label}</Link>
    </li>
  );
};

export default Navbar;
