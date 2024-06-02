import { ReactNode } from "react"
import Navbar from "./Navbar"


const Wrapper = ({children}: {children: ReactNode}) => {

    return (
        <div className="w-full h-full min-h-screen flex flex-col items-center px-2">
            <Navbar />
            {children}
        </div>
    )
}

export default Wrapper