import { PostProvider } from "./context/context";
import Main from "../src/Components/Main";

function App() {
  return (
    <section>
      <PostProvider>
        <Main />
      </PostProvider>
    </section>
  );
}

export default App;
