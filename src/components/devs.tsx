import Link from "next/link";
const Devs = () => {
  return (
    <>
      <footer className="block w-full text-white border-t-2">
        <section className="flex flex-col lg:flex-row justify-between items-center px-6 py-8 space-y-6 lg:space-y-0">
          <article className="flex flex-col items-start w-full lg:w-1/3 space-y-2">
            <h1 className="text-2xl font-bold">Akademiko RIA</h1>
            <p className="text-sm text-gray-400">
              Empowering education through technology.
            </p>
          </article>
          <article className="flex justify-center w-full lg:w-1/3 space-x-6">
            {[
              ["About us", "/#about"],
              ["FAQ", "/#faq"],
            ].map(([tag, href], index) => {
              return (
                <Link
                  key={index}
                  href={href}
                  className="font-bold hover:underline"
                >
                  {tag}
                </Link>
              );
            })}
          </article>
        </section>

        {/* Bottom Bar */}
        <section className="text-center py-4">
          <p className="text-sm text-gray-500">
            &copy; 2024-2025 Akademiko RIA. All rights reserved.
          </p>
        </section>
      </footer>
    </>
  );
};

export default Devs;
