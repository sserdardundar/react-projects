import { useRoutes } from 'react-router-dom';
import { Home } from './components/Home';
import { Wallet } from './components/Wallet';
import { Coin } from './components/Coin';
import {NotFound} from './components/NotFound'
import { Settings } from './components/Settings';
import { Profile } from './components/Profile';
import { Verify } from './components/Verify';
import { Manage } from './components/Manage';


export default function Router(props) {
  const routes = useRoutes([
    {
      path:"/home",
      element: <Home/>,
      index:true,
    },
    {
        path:"/userwallet",
        element: <Wallet tok={props.tok}/>,
        index:true,
    },
    {
        path:"/coin/:coin",
        element: <Coin  tok={props.tok}/>,
        index:true,
    },
    {
        path:"/account",
        element: <Settings tok={props.tok}/>,
        index:true,
    },
    {
        path:"/account/profile",
        element: <Profile tok={props.tok} name={props.name} setName={props.setName}/>,
        index:true,
    },
    {
        path:"/account/verify",
        element: <Verify tok={props.tok}/>,
        index:true,
    },{
        path:"/account/manage/:action",
        element: <Manage tok={props.tok}/>,
        index:true,
    },
    {   path:'*',
        element:<NotFound/>,
        index:false
    }
  ]);

  return routes;
}
