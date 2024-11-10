"use client";
import Image from "next/image";
import { DeveloperTypes } from "@/types/here";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
const Devs = () => {
  const profiles: DeveloperTypes[] = [
    {
      name: "Quin Suedad",
      img: "/quin.jpg",
      role: "Lead Full-Stack Developer",
      socials: [
        {
          Icon: FaGithub,
          label: "Github",
          link: "https://github.com/kinDreno",
        },
        {
          Icon: FaLinkedin,
          label: "LinkedIn",
          link: "https://www.linkedin.com/in/alquin-suedad-3512362b7/",
        },
        {
          Icon: FaInstagram,
          label: "Instagram",
          link: "https://www.instagram.com/queeknow/",
        },
      ],
    },
    {
      name: "Sam Daniel Mugar",
      img: "/mugar.jpg",
      role: "UI/UX Designer",
      socials: [
        {
          Icon: FaInstagram,
          label: "Instagram",
          link: "https://www.instagram.com/samwiiich_/",
        },
        {
          Icon: FaLinkedin,
          label: "LinkedIn",
          link: "https://linkedin.com/in/mugar",
        },
      ],
    },
  ];

  return (
    <>
      <main
        style={{
          backgroundImage: "url(dev-section-bg.avif)",
          filter: "blue(5px)",
        }}
        className="flex-col items-center justify-center w-full h-[50%] max-md:h-[60%] bg-black"
      >
        <h1
          className="text-center p-3 text-white text-3xl font-bold"
          style={{ textShadow: "0 0 5px indigo" }}
        >
          Developers and Contributors:
        </h1>
        <main className="flex justify-center items-center">
          <section className="flex justify-center items-center max-lg:w-[80%] max-md:space-y-3 max-md:flex-col max-md:justify-center max-md:items-center space-x-4 max-md:w-[100%] w-[60%] h-[40%] p-4">
            {profiles.map((profile, index) => (
              <article
                key={index}
                className="transition-all backdrop-blur-md p-1 transform md:hover:-translate-y-6 flex text-center max-md:w-[60%] w-[40%] h-full border-2 rounded-lg border-slate-800 border-opacity-35"
              >
                <div className="flex justify-center items-center p-1 w-[20%] max-xl:w-[70%] max-md:w-[100%] h-[7em]">
                  <Image
                    src={profile.img}
                    alt="pic of dev(s)"
                    width={60}
                    height={80}
                    className="rounded-full"
                  />
                </div>
                <section className="w-full h-full">
                  <div className="block text-left">
                    <h5 className="text-slate-200">{profile.name}</h5>
                    <h6 className="text-md text-slate-200">{profile.role}</h6>
                  </div>
                  <hr />
                  <div className="flex justify-center space-x-4 mt-3">
                    {profile.socials.map((social, idx) => (
                      <a
                        key={idx}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-200 hover:text-slate-600 transition duration-300"
                      >
                        <social.Icon size={24} className="" />
                      </a>
                    ))}
                  </div>
                </section>
              </article>
            ))}
          </section>
        </main>
      </main>
    </>
  );
};

export default Devs;
