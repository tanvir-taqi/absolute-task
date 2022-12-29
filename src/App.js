
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './router/routes';


function App() {
  return (
    <div className={`bg-[#d8eaec] min-h-[100vh]`}>
      <RouterProvider router={router}>
        
      </RouterProvider>
    </div>
  );
}

export default App;
