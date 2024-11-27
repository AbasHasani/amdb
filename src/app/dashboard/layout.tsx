
import { AnimatedTabs } from "@/components/motion-ui/AnimatedBackground";
import Link from "next/link";

export const dynamic = 'force-static' // or 'auto'
export const revalidate = 0 // disable revalidation

const Layout = ({ children }: { children: React.ReactNode }) => {
  const TABS = [
    { label: "Main", id: "toprated" },
    { label: "Lists", id: "lists" },
    { label: "Ranked", id: "ranked" },
    { label: "Search", id: "search" },
    // { label: "1 fist", id: "d/ali" },
    // { label: "2 second", id: "d/abas" },
  ];
  return (
    <div>
      <div className="flex items-start">
        <AnimatedTabs
          TABS={TABS}
          classNames="m-5"
        />
        {/* {TABS.map((tab) => (
          <Link
            key={tab.id}
            href={`/dashboard/${tab.id}`}
            className="m-5"
          >
            {tab.label}
          </Link>
        ))} */}
      </div>
      <main className="container">{children}</main>
    </div>
  );
};

export default Layout;
