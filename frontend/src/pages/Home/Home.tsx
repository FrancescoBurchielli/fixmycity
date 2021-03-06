import {FC} from 'react'
import MapWrapper from '../../components/Map/Map'
import Navbar from '../../components/Navbar/Navbar';

const Home:FC<{}>=({})=>{

    const google_api_key:string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? '';

    return (
        <div className="h-full w-full flex flex-col ">
            <Navbar/>
            <MapWrapper apiKey={google_api_key}/>
            <h1>Footer</h1>
        </div>
  )
}

export default Home