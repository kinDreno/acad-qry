"use client";
import Image from "next/image";
import { DeveloperTypes } from "@/types/here";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Boxes } from "./ui/background-boxes";
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
      <main className="flex items-center justify-center w-full h-[50%] bg-black">
        <div className="h-[20%] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
          <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
          <Boxes />
          <div className="text-center mt-4 z-50">
            <h4 className="font-bold text-white text-3xl ml-4">Developers: </h4>
          </div>
          <section
            id="grid"
            className="flex justify-center items-center space-x-4 h-[20%] w-[50%] p-4"
          >
            {profiles.map((profile, index) => (
              <article
                key={index}
                className="transition-all backdrop-blur-md transform hover:-translate-y-6 flex space-y-5 space-x-5 text-center w-[40%] h-full border-2 rounded-lg border-slate-800 border-opacity-35"
              >
                <div className="flex ml-4 justify-center items-center w-[20%] h-[7em]">
                  <Image
                    src={profile.img}
                    alt="pic of dev(s)"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
                <section>
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
                        className="text-slate-600 hover:text-slate-800 transition duration-300"
                      >
                        <social.Icon size={24} className="" />
                      </a>
                    ))}
                  </div>
                </section>
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
};

export default Devs;
