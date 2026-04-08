import './App.css'

import { RouterProvider, createHashRouter, useParams } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BoardCanvas from './pages/BoardCanvas';


function App() {
  const router = createHashRouter([
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
  return <BoardCanvas key={id} />; //In React, the key attribute is like a identity badge.
}

export default App


//If the user clicks a link to Board "3", the key is "3".
//If they then click a link to Board "4", React sees the key change from "3" to "4".
//Because the "identity" (key) changed, React says: "Oh! This isn't the same object anymore.
// I'll throw away the old Board "3" and build a brand new Board "4" from scratch."