import { memo } from "react";
import Posts from "./Posts";
import AddPost from "./AddPost";

const Main = memo(function Main() {
  return (
    <main>
      <AddPost />
      <Posts />
    </main>
  );
});

export default Main;
