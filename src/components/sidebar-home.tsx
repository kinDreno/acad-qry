import Image from "next/image";
import AlertDia from "./alert";
import { Button } from "./ui/button";

const SidebarHome = ({ emailUser }: { emailUser: string | null }) => {
  return (
    <>
      <main className="fixed bottom-0 left-0 border-r-2 border-r-slate-800 w-[20vw] max-md:hidden h-[80vh]">
        <div id="sidebar" className="h-full w-full flex flex-col">
          {/* Top section */}
          <section className="flex-1 overflow-y-auto">
            <div className="flex justify-between items-center p-4">
              <h3 className="font-bold">Recent Posts</h3>
              <Button>Refresh</Button>
            </div>
            <div className="border-b-2 mt-4 block space-x-3 space-y-2 p-4">
              <h3 className="underline font-bold">Literally Me</h3>
              <h5>
                Pineapple Pizzas are delicious, the internet told you that it
                isn&apos;t.
              </h5>
            </div>
          </section>

          {/* Bottom section */}
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
