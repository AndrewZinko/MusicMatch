import {Suspense, lazy} from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMusic } from "../../reducers/music";

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
    element: <ResultPage/>,
  }
]);

const App = () => {
  return (
    <Suspense fallback={null}>
      <RouterProvider router={router}/>
    </Suspense>
  );
}

export default App;
