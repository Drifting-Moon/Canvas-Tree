import './App.css'

import { RouterProvider, createBrowserRouter, useParams } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BoardCanvas from './pages/BoardCanvas';


function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Dashboard /> },

    { 
      path: "/board/:id", 
      element: <BoardCanvasWithKey /> 
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

function BoardCanvasWithKey() {
  const { id } = useParams();
  return <BoardCanvas key={id} />;
}

export default App
