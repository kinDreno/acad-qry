import Image from "next/image";
import AlertDia from "./alert";
import { Button } from "./ui/button";

const SidebarHome = () => {
  return (
    <>
      <div
        id="sidebar"
        className="border-r-2 border-r-slate-800 w-[20vw] max-md:hidden h-[85vh] overflow-y-scroll"
      >
        <section className="h-[85%] w-full">
          <div className="flex space-y-5 justify-around items-center ">
            <h3 className="font-bold">Recent Posts</h3>
            <Button>Refresh</Button>
          </div>
          {/* will work on mapping the new posts in this section.. 
          once I am done with data querying.. 
          well I am still working on the UI at this moment in this project. */}
          <article className="border-b-2 mt-4 block space-x-3 space-y-2">
            <h3 className="ml-3 underline">
              <b>Literally Me</b>{" "}
              {/*Username of the user who posted this new post.*/}
            </h3>
            <h5>
              {/*Title of the post here.*/} Pineapple Pizzas are delicious, the
              internet told you that it isn&apos;t.
            </h5>
          </article>
        </section>

        {/* user profile here on the bottom */}
        <article className="h-[15%] w-full border-slate-800 border-t-2 flex justify-between p-4 space-x-5 items-center">
          {/* Image of User Here */}
          <div className="flex space-x-4">
            <Image
              src={"/ryangosling.jpg"}
              alt="profile picture of user"
              height={33}
              width={43}
              style={{ width: "40px" }}
              className="rounded-full"
            />
            <div className="text-left ">
              <h5 className="font-bold">Literally Me</h5>
              <h6 className="text-sm opacity-60">
                example@gmail.com{/*user's email*/}
              </h6>
            </div>
          </div>
          {/* pfft UI here! */}
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
    </>
  );
};

export default SidebarHome;
