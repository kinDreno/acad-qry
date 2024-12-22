"use client";
import Image from "next/image";
import AlertDia from "../../../components/alert";
import { Button } from "../../../components/ui/button";
import { useFilter } from "./filterContext";
const SidebarHome = ({ emailUser }: { emailUser: string | null }) => {
  const { filter, setFilter } = useFilter();

  const filterPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!filter?.trim()) return;
  };

  return (
    <>
      <main className="fixed bottom-0 left-0 border-r-2 border-r-slate-800 w-[20vw] max-md:hidden h-[85vh]">
        <div id="sidebar" className="h-full w-full flex flex-col">
          <section className="flex-1 overflow-y-auto">
            <div className="flex justify-between items-center p-4">
              <h3 className="font-bold">Post Filtering</h3>
            </div>
            <hr />
            <div className="border-b-2 block space-x-3 space-y-2 p-4">
              <h5>
                <form onSubmit={filterPost} className="flex justify-around">
                  <select
                    value={filter || null || undefined}
                    onChange={(e) => setFilter(e.target.value)}
                    name="filter"
                    id="filtering-post"
                    className="p-2 rounded-md"
                  >
                    <option className="bg-white text-black" value="">
                      Filter a post &#8595;
                    </option>
                    <option value="Academic Related">Academic Related</option>
                    <option value="Casual">Casual</option>
                    <option value="Report">Report</option>
                  </select>
                  <Button type="submit">Filter</Button>
                </form>
              </h5>
            </div>
          </section>

          <article className="h-[15%] w-full border-t-2 border-slate-800 flex justify-between items-center p-4">
            <div className="flex items-center space-x-4">
              <Image
                src="/ryangosling.jpg"
                alt="profile picture of user"
                height={33}
                width={43}
                className="rounded-full"
              />
              <div className="text-left">
                <h5 className="font-bold">Literally Me</h5>
                <h6 className="text-sm opacity-60">{emailUser}</h6>
              </div>
            </div>
            <AlertDia
              dialogDescription={`
          Logging out will end your current session, and you will need to
          enter your credentials again to access your account. If you have
          unsaved changes or important information, please make sure to
          save them before proceeding.
        `}
              dialogTitle={"Are you sure you want to log out?"}
            />
          </article>
        </div>
      </main>
    </>
  );
};

export default SidebarHome;
