import Link from "next/link";
import {
  BoxIcon,
  Building2Icon,
  GlobeIcon,
  ShoppingCart,
  Users,
} from "lucide-react";

const menuItems = [
  {
    id: 1,
    href: "/dashboard/products",
    icon: BoxIcon,
    label: "Products",
  },
  {
    id: 2,
    href: "/dashboard/countries",
    icon: GlobeIcon,
    label: "Countries",
  },
  {
    id: 3,
    href: "/dashboard/bank",
    icon: Building2Icon,
    label: "Bank Information",
  },

  {
    id: 4,
    href: "/dashboard/orders",
    icon: ShoppingCart,
    label: "Manage Orders",
  },
  {
    id: 6,
    href: "/dashboard/users",
    icon: Users,
    label: "Manage Users",
  },
];

export const NavLinks = ({ pathname, setShowMenu }) => (
  <>
    {menuItems.map((item) => {
      const isActive = pathname?.startsWith(item.href);
      const Icon = item.icon;
      return (
        <Link
          key={item.id}
          href={item.href}
          onClick={() => setShowMenu(false)}
          className={`flex items-center gap-2 text-sm w-full px-3 py-2 rounded-lg transition-colors ${
            isActive
              ? "text-brand text-base bg-slate-100 font-semibold"
              : "hover:bg-slate-100"
          }`}
        >
          <Icon size={16} /> {item.label}
        </Link>
      );
    })}
  </>
);
