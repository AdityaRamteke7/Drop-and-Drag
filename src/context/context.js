import { createContext, useContext, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

const PostContext = createContext();

function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 8 }, () => createRandomPost())
  );
  
  // const [searchQuery, setSearchQuery] = useState("");
  // const searchedPosts =
  //   searchQuery.length > 0
  //     ? posts.filter((post) =>
  //         `${post.title} ${post.body}`
  //           .toLowerCase()
  //           .includes(searchQuery.toLowerCase())
  //       )
  //     : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }
  

  function handleClearPosts() {
    setPosts([]);
  }

  const value = useMemo(() => {
    return {
      posts,
      onAddPost: handleAddPost,
      onClearPosts: handleClearPosts,
    };
  }, [posts]);

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

function usePosts({ defaultValue = undefined } = {}) {
  const context = useContext(PostContext);
  if (!context && defaultValue === undefined)
    throw new Error("usePosts must be used within a PostProvider");
  return context ?? defaultValue;
}

export { PostProvider, usePosts };
