'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavBar.module.css';


const items = [
  { href: '/products',   label: 'Home',     icon: HomeIcon },
  { href: '/dashboards', label: 'Dashboards', icon: DashboardIcon },
  { href: '/segments',   label: 'Segments', icon: UsersIcon },
  { href: '/profile',    label: 'Account',  icon: UserIcon },
  { href: '/settings',   label: 'Settings', icon: GearIcon },
  { href: '/cart',       label: 'Cart',     icon: GearIcon }, 
];


export default function NavBar() {
const pathname = usePathname();
return (
<div className={styles.bar}>
<div className="container">
<nav className={styles.pill} aria-label="Main Navigation">
{items.map(({ href, label, icon: Icon }) => {
const active = pathname === href || pathname.startsWith(href + '/');
return (
<Link key={href} href={href} className={`${styles.item} ${active ? styles.active : ''}`}>
<Icon className={styles.icon} />
<span>{label}</span>
</Link>
);
})}
</nav>
</div>
</div>
);
}


function HomeIcon(props){
return(
<svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" {...props}>
<path d="M3 10.5 12 3l9 7.5" stroke="currentColor"/>
<path d="M5 10v10h14V10" stroke="currentColor"/>
</svg>
);
}
function DashboardIcon(props){
return(
<svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" {...props}>
<rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor"/>
<rect x="13" y="3" width="8" height="5" rx="1.5" stroke="currentColor"/>
<rect x="13" y="10" width="8" height="11" rx="1.5" stroke="currentColor"/>
<rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor"/>
</svg>
);
}
function UsersIcon(props){
return(
<svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" {...props}>
<path d="M16 14c2.8 0 5 2.2 5 5" stroke="currentColor"/>
<path d="M3 19c0-2.8 2.2-5 5-5" stroke="currentColor"/>
<circle cx="8" cy="9" r="3" stroke="currentColor"/>
<circle cx="16" cy="9" r="3" stroke="currentColor"/>
</svg>
);
}
function UserIcon(props){
return(
<svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" {...props}>
<circle cx="12" cy="7.5" r="3.5" stroke="currentColor"/>
<path d="M4 20c0-4.1 3.1-7 8-7s8 2.9 8 7" stroke="currentColor"/>
</svg>
);
}
function GearIcon(props){
return (
<svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" {...props}>
<circle cx="12" cy="12" r="3" stroke="currentColor"/>
<path d="M19 12a7 7 0 0 0-.2-1.6l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2.2-1.3L12 2 9.8 4.1a7 7 0 0 0-2.2 1.3l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .5.1 1.1.2 1.6l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2.2 1.3L12 22l2.2-2.1a7 7 0 0 0 2.2-1.3l2.4 1 2-3.4-2-1.6c.1-.5.2-1.1.2-1.6Z" stroke="currentColor"/>
</svg>
);
}