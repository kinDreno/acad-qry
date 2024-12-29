export type Alert = {
  dialogTitle: React.ReactNode;
  dialogDescription: React.ReactNode;
};

type SocialLink = {
  Icon: React.ElementType;
  label: string;
  link: string;
};

export type DeveloperTypes = {
  name: string;
  img: string;
  role: string;
  socials: SocialLink[];
};

export type SignIn = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  course: string;
  collegeYear: string;
};

export type Post = {
  title: string;
  content: string;
  tag: string;
};
export interface MainContent {
  title: string;
  content: string;
  tag: string;
  User: any;
  userId: string;
  id: number;
  postedAt: Date;
  collegeYear: string;
  charisma: number;
  Comment?: Comment[];
  slug: string;
  isOwner: boolean;
}

export type MainHome = {
  posts: MainContent[];
  userProfile: User;
};

export type User = {
  userId: string;
  firstName: string;
  email: string;
  lastName: string;
  course: string;
  collegeYear: string;
  posts?: Post[];
  comments?: Comment[];
};

export type Comment = {
  text: string;
  createdAt: string; // Changed to string (ISO date string) for consistency
  User: User;
};
