import { BlogPost } from '../types';

const API_BASE_URL = 'https://dev.to/api/';

export class BlogService {
  static async fetchBlogPosts(): Promise<BlogPost[]> {
    try {
      const response = await fetch(`${API_BASE_URL}articles?tag=nutrition&per_page=12`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform the data to match our interface
      return data.map((post: any) => ({
        id: post.id,
        title: post.title,
        description: post.description,
        cover_image: post.cover_image,
        url: post.url,
        published_at: post.published_at,
        user: {
          name: post.user?.name,
          username: post.user?.username,
        },
      }));
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  }

  static async fetchMockBlogPosts(): Promise<BlogPost[]> {
    // Mock data for development/testing
    return [
      {
        id: 1,
        title: "5 Nutrition Myths Debunked",
        description: "Discover the truth behind common nutrition misconceptions and learn evidence-based facts about healthy eating.",
        cover_image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
        url: "https://example.com/nutrition-myths",
        published_at: "2024-01-15T10:00:00Z",
        user: {
          name: "Dr. Sarah Johnson",
          username: "sarah_johnson",
        },
      },
      {
        id: 2,
        title: "The Complete Guide to Protein",
        description: "Everything you need to know about protein: sources, requirements, and how to optimize your intake.",
        cover_image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
        url: "https://example.com/protein-guide",
        published_at: "2024-01-12T14:30:00Z",
        user: {
          name: "Mike Chen",
          username: "mike_chen",
        },
      },
      {
        id: 3,
        title: "Hydration: More Than Just Water",
        description: "Learn about proper hydration, electrolyte balance, and how to stay hydrated throughout the day.",
        cover_image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
        url: "https://example.com/hydration-guide",
        published_at: "2024-01-10T09:15:00Z",
        user: {
          name: "Lisa Rodriguez",
          username: "lisa_rodriguez",
        },
      },
      {
        id: 4,
        title: "Carbohydrates: Friend or Foe?",
        description: "Understanding the role of carbohydrates in your diet and how to make smart carb choices.",
        cover_image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400",
        url: "https://example.com/carbohydrates-guide",
        published_at: "2024-01-08T16:45:00Z",
        user: {
          name: "David Kim",
          username: "david_kim",
        },
      },
      {
        id: 5,
        title: "Essential Vitamins and Minerals",
        description: "A comprehensive guide to essential vitamins and minerals for optimal health and wellness.",
        cover_image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
        url: "https://example.com/vitamins-minerals",
        published_at: "2024-01-05T11:20:00Z",
        user: {
          name: "Emma Wilson",
          username: "emma_wilson",
        },
      },
      {
        id: 6,
        title: "Healthy Fats: The Good, The Bad, The Ugly",
        description: "Understanding different types of fats and how to incorporate healthy fats into your diet.",
        cover_image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
        url: "https://example.com/healthy-fats",
        published_at: "2024-01-03T13:10:00Z",
        user: {
          name: "Alex Thompson",
          username: "alex_thompson",
        },
      },
    ];
  }
} 