import { ForumUser, ForumPost, ForumCounter } from "../types";

export const forumUsers: ForumUser[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Jane" },
  { id: 4, name: "David" },
];

export const forumPosts: ForumPost[] = [
  {
    id: 1,
    title: "5 Nutrition Myths Debunked",
    content:
      "Discover the truth behind common nutrition misconceptions and learn evidence-based facts about healthy eating.",
    tags: ["Nutrition", "Myths"],
    author: forumUsers[0],
    createdAt: "2024-01-15T10:00:00Z",
    comments: 4,
    likes: 12,
  },
  
  // ...add more posts as needed
];

export const forumTags: string[] = [
  "All",
  "Nutrition",
  "Myths",
  "Protein",
  "Diet",
  "Hydration",
  "Wellness",
  "Carbs",
];

export const forumCounters: ForumCounter[] = [
  { label: "Posts", value: 124 },
  { label: "Users", value: 56 },
  { label: "Comments", value: 312 },
  { label: "Likes", value: 789 },
];
