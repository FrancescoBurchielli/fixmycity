import {FC,useState} from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar:FC<{}> = ({}) => {

    const [showMenu,setShowMenu] = useState(false);
    
    const menuClickHandler = () => {
        setShowMenu(!showMenu);
    }

    return (
        <>
            <div className='absolute z-[12] w-full h-[30px] flex flex-row justify-end items-center pr-3 pt-1'>
                {showMenu?                          
                    <AiOutlineClose size={30} onClick={menuClickHandler} className='cursor-pointer'/> 
                :
                    <AiOutlineMenu size={30} onClick={menuClickHandler} className='cursor-pointer'/>
                }            
            </div>            
            <div className={showMenu? 'flex flex-col fixed z-[11] left-0 top-0 w-full h-full bg-white bg-opacity-[.87] ease-in-out duration-700 md:w-[25%]' : 'fixed z-[11] top-[-100%] w-full h-full ease-in-out duration-700 md:top-0 md:left-[-100%] md:w-[25%]'} >
                <ul className='flex flex-col grow p-4 pt-10 uppercase'>
                    <li className='p-4 border-b border-gray-600 text-center md:text-left'>Home</li>
                    <li className='p-4 border-b border-gray-600 text-center md:text-left'>Profile</li>
                    <li className='p-4 border-b border-gray-600 text-center md:text-left'>Issues</li>
                    <li className='p-4 border-b border-gray-600 text-center md:text-left'>About</li>
                </ul>
            </div>
          
        </>
    )
}

export default Navbar;
