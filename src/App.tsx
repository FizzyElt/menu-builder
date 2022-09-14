import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Router } from 'react-router-dom';
import Routes from './router';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
