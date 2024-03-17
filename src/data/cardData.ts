import CommunityImage from "../assets/images/undraw_showing_support_re_5f2v.svg";
import LearningImage from "../assets/images/undraw_developer_activity_re_39tg.svg";
import CollaborationImage from "../assets/images/undraw_code_typing_re_p8b9.svg";

export const cardData: {
  id: number;
  title: string;
  description: string;
  image: string;
}[] = [
  {
    id: 1,
    title: "Live Coding Community",
    image: CommunityImage,
    description:
      "Engage in real-time coding sessions with a vibrant community of developers. Join a room and collaborate seamlessly with others, sharing insights, expertise, and code snippets as you work together towards your goals.",
  },
  {
    id: 2,
    title: "Interactive Learning Environment",
    image: LearningImage,
    description:
      "Immerse yourself in an interactive learning experience where every line of code comes to life. See changes happen instantly as you code alongside peers, accelerating your understanding and mastery of programming concepts.",
  },
  {
    id: 3,
    title: "Empowering Collaboration Tools",
    image: CollaborationImage,
    description:
      "Unlock the power of collaborative coding with our suite of intuitive tools. From live editing to real-time chat, our platform facilitates fluid communication and teamwork, empowering you to create, iterate, and innovate together effortlessly. Start your collaborative coding journey today!",
  },
];
