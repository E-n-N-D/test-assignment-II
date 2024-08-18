interface Post {
    _id: string;
    chain: string;
    author: {username: String};
    operation: string;
    operand: number;
    result: number;
    prevPost?: string;
    createdAt: Date;
  }
  
  interface NestedPost extends Post {
    children: NestedPost[];
  }
  
export function arrangePosts(posts: Post[]): NestedPost[] {
    const postMap = new Map<string, NestedPost>();
    const rootPosts: NestedPost[] = [];

    posts.forEach(post => {
        postMap.set(post._id, { ...post, children: [] });
    });

    postMap.forEach((post, id) => {
        console.log(post)
        if (post.prevPost) {
            const parentPost = postMap.get(post.prevPost);
            if (parentPost) {
                parentPost.children.push(post);
            }
        } else {
            rootPosts.push(post);
        }
    });

    return rootPosts;
}
  