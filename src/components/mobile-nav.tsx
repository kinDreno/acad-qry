import { IoMenu } from "react-icons/io5";

const MobileNav = ({ state }: { state: () => void }) => {
  return (
    <section className="hidden max-md:block">
      <button onClick={state}>
        <IoMenu size={30} />
      </button>
    </section>
  );
};

export default MobileNav;
