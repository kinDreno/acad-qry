export type Alert = {
  dialogTitle: React.ReactNode;
  dialogDescription: React.ReactNode;
};
export type SocialLink = {
  Icon: React.ElementType; // This will hold the icon component
  label: string; // The label for the social link (e.g., "Github")
  link: string; // The URL or link for the social profile
};

export type DeveloperTypes = {
  name: string;
  img: string;
  role: string;
  socials: SocialLink[];
};
