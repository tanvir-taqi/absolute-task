
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './router/routes';


function App() {
  const theme = useSelector(state => state.darkToggleMode)

  return (
    <div className={`${theme ? "bg-[#bbe3e7] text-[#0f1b29]": " text-[#d8eaec] bg-[#0f1b29]"} min-h-[100vh]`}>
      <RouterProvider router={router}>
        
      </RouterProvider>
    </div>
  );
}

export default App;
