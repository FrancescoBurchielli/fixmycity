import CreateIssue from "../components/CreateIssue/CreateIssue";
import Home from "../pages/Home/Home";

const routes = [{    
    path: "/", element: <Home />,
},
{    
    path: "/createissue", element: <CreateIssue />,
}
];
  
  
export default routes;