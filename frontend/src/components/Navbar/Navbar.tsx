import {FC,useState} from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar:FC<{}> = ({}) => {

    const [showMenu,setShowMenu] = useState(false);
    
    const menuClickHandler = () => {
        setShowMenu(!showMenu);
    }

    return (
        <div className='absolute w-full z-10 h-[4%] flex flex-row justify-end md:justify-start items-center p-2'>
            {showMenu?
                <AiOutlineClose size={30} onClick={menuClickHandler} className='cursor-pointer'/>
            :
                <AiOutlineMenu size={30} onClick={menuClickHandler} className='cursor-pointer'/>
            }
            
        </div>
    )
}

export default Navbar;
