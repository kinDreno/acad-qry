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
  User: string;
  postedAt: Date;
  collegeYear: string;
  charisma: 0 | 1;
  comments?: Comment[];
}

export type Comment = {
  text: string;
  userId: string;
  postId: number;
  createdAt: Date;
};

export type User = {
  firstName: string;
  lastName: string;
  course: string;
  collegeYear: string;
  email: string;
  posts: Post[];
  comments: Comment[];
};
