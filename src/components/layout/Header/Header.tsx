import {
  ChevronDown,
  MessageSquareText,
  TextAlignJustify,
  LogOut,
  Menu,
} from "lucide-react";
import { MdNotificationsNone } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getInitials } from "@/utils/getInitials";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { navItems, userMenuItems } from "./_data";

const Header = () => {
  const { user, userName, isUserLoading } = useCurrentUser();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full pt-2.5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div
        className="flex py-2.5 px-3 items-center justify-between rounded-4xl border-b"
        style={{
          boxShadow:
            "0px 1px 3px 0px rgba(45, 59, 67, 0.04), 0px 1px 2px 0px rgba(45, 59, 67, 0.06)",
        }}
      >
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-6 md:w-8 ml-2" />

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-muted-foreground hover:text-foreground"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] px-0">
              <SheetHeader className="px-6 pb-4">
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    className={cn(
                      "flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors",
                      item.active
                        ? "bg-black text-white"
                        : "text-muted-foreground hover:bg-secondary"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          {navItems.map((item) => {
            const hasDropdownOptions =
              item.dropdownOptions && item.dropdownOptions.length > 0;

            if (openDropdown && hasDropdownOptions) {
              return (
                <DropdownMenu
                  key={item.name}
                  open={openDropdown}
                  onOpenChange={setOpenDropdown}
                >
                  <DropdownMenuTrigger className="flex items-center gap-2 bg-black text-white rounded-4xl">
                    <span className="flex items-center gap-1 text-sm font-medium border-r border-white/20 p-2 px-3">
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </span>
                    <div className="flex items-center gap-1 py-2 pl-1.5 pr-3">
                      <p className="text-sm font-medium min-w-max">
                        {item.dropdownOptions[0].name}
                      </p>
                      <ChevronDown size={14} />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    sideOffset={16}
                    className="min-w-[300px] flex flex-col gap-3 rounded-xl border-0 py-3"
                  >
                    {item.dropdownOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.name}
                        className="border border-transparent bg-transparent hover:border hover:border-muted rounded-xl cursor-pointer"
                      >
                        <span className="flex items-center justify-center p-2 border border-muted rounded-lg">
                          <img
                            src={option.iconUrl}
                            alt={option.name}
                            className="h-4 w-4"
                          />
                        </span>
                        <div className="hover:translate-x-[-2px] transition-all duration-300">
                          <p className="text-sm font-medium">{option.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            return (
              <Button
                key={item.name}
                variant={item.active ? "default" : "ghost"}
                className={cn(
                  "gap-2",
                  item.active
                    ? "bg-black text-white hover:bg-black/90"
                    : "text-muted-foreground hover:text-foreground",
                  hasDropdownOptions && "cursor-pointer"
                )}
                onClick={
                  hasDropdownOptions
                    ? () => setOpenDropdown(!openDropdown)
                    : undefined
                }
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground hover:text-foreground h-8 w-8 md:h-10 md:w-10"
          >
            <MdNotificationsNone className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground hover:text-foreground h-8 w-8 md:h-10 md:w-10"
          >
            <MessageSquareText className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center p-1 bg-secondary rounded-4xl cursor-pointer hover:bg-secondary/80 transition-colors">
                {isUserLoading ? (
                  <Skeleton className="h-8 w-8 rounded-full" />
                ) : (
                  <>
                    <div
                      className="h-6 w-6 flex items-center justify-center rounded-full text-white"
                      style={{
                        background:
                          "linear-gradient(135deg, #5C6670 0%, #131316 100%)",
                      }}
                    >
                      <span className="text-[11px] font-semibold">
                        {getInitials(userName)}
                      </span>
                    </div>
                    <span className="px-1.5">
                      <TextAlignJustify className="h-3 w-3 text-muted-foreground" />
                    </span>
                  </>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={16}
              className="flex flex-col gap-2 w-64 px-2 py-3 rounded-2xl border-0"
            >
              <div className="flex items-center gap-3 p-3">
                <div
                  className="h-[30px] w-[30px] flex items-center justify-center rounded-full text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #5C6670 0%, #131316 100%)",
                  }}
                >
                  <span className="text-sm font-medium">
                    {getInitials(userName)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{userName}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email || ""}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 pl-1">
                {userMenuItems.map((item) => (
                  <DropdownMenuItem
                    key={item.label}
                    className="cursor-pointer flex items-center gap-3 text-sm font-medium rounded-lg"
                    onClick={item.onClick}
                  >
                    <item.icon />
                    {item.label}
                  </DropdownMenuItem>
                ))}

                <DropdownMenuItem
                  className="flex items-center gap-3 text-sm font-medium cursor-pointer rounded-lg"
                  onClick={() => {}}
                >
                  <LogOut />
                  Sign Out
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
