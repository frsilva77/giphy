import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

import Gif from "./Gif";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Gif />
      </div>
    </ChakraProvider>
  );
}

export default App;
