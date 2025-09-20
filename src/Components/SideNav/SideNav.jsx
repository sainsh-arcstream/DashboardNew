import "./SideNav.css";
import {
  Home,
  Heart,
  Target,
  Star,
  Play,
  Tv,
  Dice6,
  Gamepad2,
  Gift,
  ChevronDown,
} from "lucide-react";

function SideNav() {
  return (
    <aside className="sidenav">
      {/* Logo */}
      <div className="logo">
        <span className="logo-icon">✦</span>
        <span className="logo-text">Bravo4All</span>
      </div>

      {/* Nav Items */}
      <nav className="nav">
        <NavItem icon={<Home size={18} />} label="Home" />
        <NavItem icon={<Heart size={18} />} label="Favorite" />
        <NavItem icon={<Target size={18} />} label="Challenges" />
        <NavItem icon={<Star size={18} />} label="Originals" />
        <NavItem icon={<Play size={18} />} label="Slots" />
        <NavItem icon={<Tv size={18} />} label="Live Casino" />
        <NavItem icon={<Dice6 size={18} />} label="Black Jack" />
        <NavItem icon={<Dice6 size={18} />} label="Roulette" />
        <NavItem
          icon={<Gamepad2 size={18} />}
          label="More Games"
          trailing={<ChevronDown size={14} />}
        />
        <NavItem icon={<Gift size={18} />} label="Promotions" />
      </nav>

      {/* Footer */}
      <div className="footer">
        <span className="footer-logo">Hyde</span>
        <span className="footer-version">v1.0</span>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, trailing }) {
  return (
    <div className="nav-item">
      <div className="nav-left">
        <span className="nav-icon">{icon}</span>
        <span className="nav-label">{label}</span>
      </div>
      {trailing && <span className="nav-trailing">{trailing}</span>}
    </div>
  );
}

export default SideNav;
