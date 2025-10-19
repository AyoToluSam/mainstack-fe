import { Home, Settings } from "lucide-react";
import { FaMoneyBills } from "react-icons/fa6";
import {
  MdOutlineAnalytics,
  MdOutlineWidgets,
  MdOutlinePeopleAlt,
  MdOutlineCardGiftcard,
  MdOutlineBugReport,
  MdOutlineSwitchAccount,
} from "react-icons/md";
import { IoReceiptOutline } from "react-icons/io5";

export const navItems = [
  { name: "Home", icon: Home, active: false },
  { name: "Analytics", icon: MdOutlineAnalytics, active: false },
  { name: "Revenue", icon: FaMoneyBills, active: true },
  { name: "CRM", icon: MdOutlinePeopleAlt, active: false },
  {
    name: "Apps",
    icon: MdOutlineWidgets,
    active: false,
    dropdownOptions: [
      {
        name: "Link in Bio",
        description: "Manage your Link in Bio",
        iconUrl: "/svgs/link_in_bio.svg",
      },
      {
        name: "Store",
        description: "Manage your Store activities",
        iconUrl: "/svgs/store.svg",
      },
      {
        name: "Media Kit",
        description: "Manage your Media Kit",
        iconUrl: "/svgs/media_kit.svg",
      },
      {
        name: "Invoicing",
        description: "Manage your Invoices",
        iconUrl: "/svgs/invoicing.svg",
      },
      {
        name: "Bookings",
        description: "Manage your Bookings",
        iconUrl: "/svgs/bookings.svg",
      },
    ],
  },
];

export const userMenuItems = [
  {
    icon: Settings,
    label: "Settings",
    onClick: () => {},
  },
  {
    icon: IoReceiptOutline,
    label: "Purchase History",
    onClick: () => {},
  },
  {
    icon: MdOutlineCardGiftcard,
    label: "Refer and Earn",
    onClick: () => {},
  },
  {
    icon: MdOutlineWidgets,
    label: "Integrations",
    onClick: () => {},
  },
  {
    icon: MdOutlineBugReport,
    label: "Report Bug",
    onClick: () => {},
  },
  {
    icon: MdOutlineSwitchAccount,
    label: "Switch Account",
    onClick: () => {},
  },
];
