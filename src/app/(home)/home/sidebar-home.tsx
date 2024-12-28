"use client";
import Image from "next/image";
import { useFilter } from "./filterContext";
import Link from "next/link";
const SidebarHome = ({ emailUser }: { emailUser: string }) => {
  const { filter, setFilter } = useFilter();

  const filterPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!filter?.trim()) return;
  };

  return (
    <>
      <main className="fixed bottom-0 left-0 border-r border-slate-800 w-[20vw] max-md:hidden h-[85vh]">
        <div id="sidebar" className="h-full w-full flex flex-col">
          <section className="flex-1 overflow-y-auto">
            <div className="flex justify-between items-center p-4 ">
              <h3 className="font-bold text-lg">Post Filtering</h3>
            </div>
            <div className="border-b border-gray-300 space-x-3 space-y-2 p-4">
              <h5>
                <form
                  onSubmit={filterPost}
                  className="flex justify-around items-center space-x-2"
                >
                  <select
                    value={filter || null || undefined}
                    onChange={(e) => setFilter(e.target.value)}
                    name="filter"
                    id="filtering-post"
                    className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option className="bg-white text-black" value="">
                      Filter a post &#8595;
                    </option>
                    <option value="Academic Related">Academic Related</option>
                    <option value="Casual">Casual</option>
                    <option value="Report">Report</option>
                  </select>
                </form>
              </h5>
            </div>
          </section>

          <Link
            href={`/home/profile/${emailUser}`}
            className="h-[15%] w-full border-t border-gray-300 flex justify-between items-center p-4 transition"
          >
            <div className="flex items-center space-x-4">
              <Image
                src="/ryangosling.jpg"
                alt="profile picture of user"
                height={33}
                width={43}
                className="rounded-full border border-gray-300"
              />
              <div className="text-left">
                <h5 className="font-bold text-base">Literally Me</h5>
                <h6 className="text-sm text-gray-500">{emailUser}</h6>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </>
  );
};

export default SidebarHome;
