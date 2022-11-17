import {Suspense, lazy} from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import FallbackPage from "../../routes/FallbackPage/FallbackPage";

import './App.css';

const MainPage = lazy(() => import("../../routes/MainPage/MainPage"));
const ResultPage = lazy(() => import("../../routes/ResultPage/ResultPage"));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage/>,
  },
  {
    path: '/search',
    element: <ResultPage/>
  }
]);

const App = () => {
  return (
    <Suspense fallback={<FallbackPage/>}>
      <RouterProvider router={router}/>
    </Suspense>
  );
}

export default App;
