import { useEffect } from 'react'
import {FC,useState} from 'react'
import List from "../List/List"

type Todo = {
    id: number,
    todo: string,
    completed: boolean
}

interface AppStateObject {
    id: number,
    text: string,
    values: number[]
}

//{id:1,text:"complex state from App!",values:[1,2,3]}



const HelloWorld: FC<{propsForChild:Todo,appState:string,setAppState:Function,complexAppState:AppStateObject}> = ({propsForChild,appState,setAppState}) => {


    const [sampleState,setSampleState] = useState("Testing typescript!")

    useEffect(()=>{
        setTimeout(()=>setAppState("new App state served to you!"),2000)

    },[])

    const avengersList = [
        { name: 'Captain America' },
        { name: 'Iron Man' },
        { name: 'Black Widow' },
        { name: 'Thor' },
        { name: 'Hawkeye' },
        { name: 'Vision' },
        { name: 'Hulk' },
      ]
      

    return(
        <>
            <h1>Hello TypeScript!</h1>
            <p>{propsForChild.todo}</p>
            <p>{appState}</p>
            <List avengers={avengersList}/>
        </>       
    )
}

export default HelloWorld;