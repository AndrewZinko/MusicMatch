import {Suspense, lazy} from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import './App.css';

const MainPage = lazy(() => import("../../routes/MainPage/MainPage"));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage/>,
  },
  {
    path: '/search',
    element: null,
    loader: null
  }
])

const App = () => {
  return (
    <Suspense fallback={null}>
      <RouterProvider router={router}/>
    </Suspense>
  );
}

export default App;
