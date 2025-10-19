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
        iconUrl: "/src/assets/svgs/link_in_bio.svg",
      },
      {
        name: "Store",
        description: "Manage your Store activities",
        iconUrl: "/src/assets/svgs/store.svg",
      },
      {
        name: "Media Kit",
        description: "Manage your Media Kit",
        iconUrl: "/src/assets/svgs/media_kit.svg",
      },
      {
        name: "Invoicing",
        description: "Manage your Invoices",
        iconUrl: "/src/assets/svgs/invoicing.svg",
      },
      {
        name: "Bookings",
        description: "Manage your Bookings",
        iconUrl: "/src/assets/svgs/bookings.svg",
      },
    ],
  },
];

export const userMenuItems = [
  {
    icon: Settings,
    label: "Settings",
    onClick: () => console.log("Settings"),
  },
  {
    icon: IoReceiptOutline,
    label: "Purchase History",
    onClick: () => console.log("Purchase History"),
  },
  {
    icon: MdOutlineCardGiftcard,
    label: "Refer and Earn",
    onClick: () => console.log("Refer and Earn"),
  },
  {
    icon: MdOutlineWidgets,
    label: "Integrations",
    onClick: () => console.log("Integrations"),
  },
  {
    icon: MdOutlineBugReport,
    label: "Report Bug",
    onClick: () => console.log("Report Bug"),
  },
  {
    icon: MdOutlineSwitchAccount,
    label: "Switch Account",
    onClick: () => console.log("Switch Account"),
  },
];
