import CreateIssue from "../components/CreateIssue/CreateIssue";
import IssueDetails from "../components/IssueDetails/IssueDetails";
import Home from "../pages/Home/Home";

const routes = [{    
    path: "/", element: <Home />,
},
{    
    path: "/createissue", element: <CreateIssue />,
},
{    
    path: "/issuedetails/:id", element: <IssueDetails />,
}
];
  
  
export default routes;