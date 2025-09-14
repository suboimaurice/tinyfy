import logoImage from '../assets/images/logo-image.png'
import { FiSearch } from 'react-icons/fi';
import { Link } from "react-router-dom";



function Header(){
    return(
        <header className="w-full flex items-center justify-between bg-[#f1c5ef] shadow px-4">
            <div className="flex items-center gap-2">
                <img src={logoImage} className="h-20 w-auto" alt="Tinyfy Logo" />
            </div>

            <Link to="/dashboard" className="text-[#2d112b] font-bold ml-4">Dashboard</Link>
        </header>
    );
}

export default Header