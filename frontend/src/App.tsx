import {FC} from 'react'
import MapWrapper from "./components/Map/Map";

const google_api_key:string = "AIzaSyBLp6mRlnhc2VSe4PtSNApwU3Sdh94PUdo"//process.env.REACT_APP_GOOGLE_API_KEY ?? '';

const App: FC<{}> = () => {
  return (
    <div className="h-full w-full flex flex-col ">
      <h1>Header</h1>
      <MapWrapper apiKey={google_api_key}/>
      <h1>Footer</h1>
    </div>
  );
}

export default App;
