import { forumPosts, forumTags, forumCounters } from "../data/forumData";
import { ForumPost, ForumCounter } from "../types";

export class ForumService {
  static async fetchPosts(): Promise<ForumPost[]> {
    await new Promise((res) => setTimeout(res, 400));
    return forumPosts;
  }

  static async fetchTags(): Promise<string[]> {
    await new Promise((res) => setTimeout(res, 100));
    return forumTags;
  }

  static async fetchCounters(): Promise<ForumCounter[]> {
    await new Promise((res) => setTimeout(res, 100));
    return forumCounters;
  }
}
