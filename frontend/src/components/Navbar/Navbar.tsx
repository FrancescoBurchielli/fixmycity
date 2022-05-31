import {FC,useState} from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar:FC<{}> = ({}) => {

    const [showMenu,setShowMenu] = useState(false);
    
    const menuClickHandler = () => {
        setShowMenu(!showMenu);
    }

    return (
        <>
            <div className='absolute z-10 w-full h-[30px] flex flex-row justify-end items-center pr-3 pt-1'>
                {showMenu?                          
                    <AiOutlineClose size={30} onClick={menuClickHandler} className='cursor-pointer'/> 
                :
                    <AiOutlineMenu size={30} onClick={menuClickHandler} className='cursor-pointer'/>
                }            
            </div>            
            <div className={showMenu? 'flex flex-col fixed z-10 left-0 top-0 w-[25%] h-full bg-white bg-opacity-75 ease-in-out duration-500' : 'fixed top-0 left-[-100%] ease-in-out duration-500 '} >
                <ul className='flex flex-col grow p-4 pt-10 uppercase'>
                    <li className='p-4 border-b border-gray-600'>Home</li>
                    <li className='p-4 border-b border-gray-600'>Profile</li>
                    <li className='p-4 border-b border-gray-600'>Issues</li>
                    <li className='p-4 border-b border-gray-600'>About</li>
                </ul>
            </div>
          
        </>
    )
}

export default Navbar;
