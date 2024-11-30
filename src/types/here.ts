// general static types here
//instead of writing it in a specific component or page.

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

export interface MainContent extends Post {
  userId: string;
  id: number;
  User: User;
  postedAt: Date;
  collegeYear: string;
  charisma: number;
  Comment: Comment[];
  slug: string;
}

export type Comment = {
  text: string;
  createdAt: Date;
  User: User;
};

export type User = {
  firstName: string;
  lastName: string;
  course: string;
  collegeYear: string;
  posts: Post[];
  comments: Comment[];
};
