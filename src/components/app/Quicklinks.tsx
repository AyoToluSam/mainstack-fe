import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface QuickLink {
  id: string;
  label: string;
  href: string;
  svgPath: string;
}

const quickLinks: QuickLink[] = [
  {
    id: "link-in-bio",
    label: "Link in Bio",
    href: "#",
    svgPath: "/src/assets/svgs/link_in_bio.svg",
  },
  {
    id: "store",
    label: "Store",
    href: "#",
    svgPath: "/src/assets/svgs/store.svg",
  },
  {
    id: "media-kit",
    label: "Media Kit",
    href: "#",
    svgPath: "/src/assets/svgs/media_kit.svg",
  },
  {
    id: "invoicing",
    label: "Invoicing",
    href: "#",
    svgPath: "/src/assets/svgs/invoicing.svg",
  },
];

const Quicklinks = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
        <div
          className="flex flex-col gap-2 rounded-4xl bg-white p-1 shadow-xl"
          style={{
            boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.08)",
          }}
        >
          {quickLinks.map((link, index) => (
            <TooltipProvider key={link.id} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={link.href}
                    className="group relative flex items-center justify-center rounded-full transition-all duration-300 hover:bg-gray-100 p-1.5"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <img
                      src={link.svgPath}
                      alt={link.label}
                      className="h-5 w-5 transition-all duration-300"
                      style={{
                        filter:
                          hoveredIndex === index
                            ? "grayscale(0%)"
                            : "grayscale(100%)",
                      }}
                    />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-black text-white">
                  <p className="text-sm">{link.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>

      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-[calc(100vw-2rem)] px-4">
        <div
          className="flex flex-row gap-2 rounded-4xl bg-white p-1 shadow-xl justify-center"
          style={{
            boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.08)",
          }}
        >
          {quickLinks.map((link, index) => (
            <TooltipProvider key={link.id} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={link.href}
                    className="group relative flex flex-col items-center justify-center gap-0 rounded-2xl transition-all duration-300 hover:bg-gray-100 p-2 min-w-[60px]"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <img
                      src={link.svgPath}
                      alt={link.label}
                      className="h-5 w-5 transition-all duration-300"
                      style={{
                        filter:
                          hoveredIndex === index
                            ? "grayscale(0%)"
                            : "grayscale(100%)",
                      }}
                    />
                    <span className="text-[10px] font-medium text-muted-foreground text-center">
                      {link.label}
                    </span>
                  </a>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-black text-white lg:hidden"
                >
                  <p className="text-sm">{link.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </>
  );
};

export default Quicklinks;
