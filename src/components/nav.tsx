import { PiHandshakeFill } from "react-icons/pi";
import Link from "next/link";

const Nav: React.FC = () => {
  return (
    <nav className="flex justify-between p-8 backdrop-blur-md fixed items-center overflow-hidden w-full h-24 border-2 border-slate-700">
      <Link href="/" className="flex items-center">
        <PiHandshakeFill size={50} />
        <h3 className="ml-2 text-lg font-bold">AcadQry!</h3>
      </Link>
      <ul className="flex space-x-6 items-center">
        {[
          ["About", "#about"],
          ["Developers", "#developers"],
          ["Features", "#features"],
        ].map(([label, href], index) => (
          <li key={index}>
            <Link
              href={href}
              className="text-lg hover:text-blue-500 hover:underline transition duration-300"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
