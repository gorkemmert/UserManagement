import { useState } from "react"
import { Link } from "react-router-dom";
import { logo, menu, close } from "../assets"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContex";
import { toast } from "react-toastify";


const Navbar = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleClick = () => setOpen(!open)
    const handleLogout = () => {
        navigate('/login')
        logout()
    }
  return (
    <div className="w-full h-[80px] z-10 bg-[#E1D7C6] fixed drop-shadow-lg relative">
        <div className="flex justify-between items-center w-full h-full md:max-w-[1240px] m-auto">
            <div className="flex items-center">
                <img src={logo} alt="logo" className="xs:ml-10 sm:ml-10 ss:ml-10 md:ml-3 ml-3 opacity-[60%] w-full h-[35px]"/>
                
            </div>
            <div className="flex items-center">
                <ul className="hidden md:flex">
                    <Link to={token ? "/" : "/login"} onClick={() => {!token ? toast.info("Lütfen Giriş Yapınız"): ""}}>
                        <li>
                            Kullanıcı Yönetimi
                        </li>
                    </Link>
                    <li>Meslek Bilgileri</li>
                    <li>Sistem Ayarları</li>
                </ul>
            </div>
            <div className="hidden md:flex sm:mr-10 md:mr-10 xs:mr-10">
                {token ? (
                    <button onClick={handleLogout} className="border-none bg-transparent text-black mr-4">Çıkış Yap</button>
                ): (
                    <button onClick={()=>navigate('/login')} className="border-none bg-transparent text-black mr-4">Giriş Yap</button>
                )}
                
                
                {/* <button className="px-5 py-3">Sign up</button> */}
            </div>
            <div className="md:hidden" onClick={handleClick}>
                <img src={!open ? menu : close} alt="menu" className="w-[28px] h-[28px] object-contain mr-10"/>
            </div>
        </div>
        <ul className={open ? "w-full absolute bg-[#E1D7C6] md:hidden": "hidden"}>
                <li className="flex justify-center">Kullanıcı Yönetimi</li>
                <li className="flex justify-center">Meslek Bilgileri</li>
                <li className="flex justify-center">Sistem Ayarları</li>
                
                <div className="flex flex-col px-4">

                    {token ? (
                        <button onClick={handleLogout} className="bg-transparent text-black mb-4 py-3 px-8">Çıkış Yap</button>
                    ): (
                        <button onClick={()=>navigate('/login')} className="bg-transparent text-black mb-4 py-3 px-8">Giriş Yap</button>
                    )}
                    {/* <button onClick={()=>navigate('/login')} className="bg-transparent text-black mb-4 py-3 px-8">Login</button> */}
                    {/* <button className="px-5 py-3">Sign up</button> */}
                </div>
            </ul>
    </div>
  )
}

export default Navbar