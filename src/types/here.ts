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
  postedAt?: Date;
  userId?: string;
  comments?: Comment[];
};

export interface MainContent extends Post {
  charisma?: number;
}

export type Comment = {
  id: number;
  text: string;
  userId: string;
  postId: number;
  createdAt: Date;
};

export type User = {
  id: number;
  uid: string;
  firstName: string;
  lastName: string;
  course: string;
  collegeYear: string;
  email: string;
  posts: Post[];
  comments: Comment[];
};
