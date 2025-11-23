import { Navbar , Footer } from "../components"
import UsersPage from "./UsersPage"

const HomePage = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar/>
      <div className="pb-30">
        <UsersPage/>
      </div>
      <Footer/>
    </div>
  )
}

export default HomePage