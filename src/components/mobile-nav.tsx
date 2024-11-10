import { IoMdMenu } from "react-icons/io";

const MobileNav = ({ state }: { state: () => void }) => {
  return (
    <section className="hidden max-md:block">
      <button onClick={state} className="text-white">
        <IoMdMenu size={30} />
      </button>
    </section>
  );
};

export default MobileNav;
