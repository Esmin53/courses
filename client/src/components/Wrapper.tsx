import { ReactNode } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"


const Wrapper = ({children}: {children: ReactNode}) => {

    return (
        <div className="w-full h-full min-h-screen flex flex-col items-center">
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default Wrapper