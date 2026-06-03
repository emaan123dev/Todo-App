// import { Link, useNavigate } from "react-router-dom";
// function Home() {
//     const navigate = useNavigate();

//     const handleAddTask = () => {
//         const user = localStorage.getItem("user");

//         if (!user) {
//             navigate("/signup");
//             return;
//         }

//         navigate("/tasks");
//     };
//     return (
//         <div className="min-h-screen bg-[#f5f5f5]">
//             {/* Navbar */}
//             <nav className="flex justify-between items-center px-12 pt-6">
//                 <h1 className="text-4xl font-bold">Todo App</h1>
//                 <div className="flex gap-4">
//                     <Link to="/signup">
//                         <button className="w-[116px] h-[52px] bg-[#D9D9D9] rounded-md text-sm font-medium cursor-pointer">
//                             Signup
//                         </button>
//                     </Link>

//                     <Link to="/signin">
//                         <button className="w-[116px] h-[52px] bg-[#D9D9D9] rounded-md text-sm font-medium cursor-pointer">
//                             SignIn
//                         </button>
//                     </Link>
//                 </div>
//             </nav>

//             {/* Hero Section */}
//             <div className="flex justify-center mt-24">
//                 <div className="w-[818px] h-[495px] bg-[#EAEAEA] rounded-xl flex flex-col justify-center items-center">
//                     <h2 className="text-[48px] font-bold text-[#7C4A4A] uppercase leading-tight text-center mb-12">
//                         Add Your First Task
//                         <br />
//                         And Make Yourself
//                         <br />
//                         Be Easy
//                     </h2>

//                     <button
//                         onClick={handleAddTask}
//                         className="w-[359px] h-[84px] bg-[#D9D9D9] rounded-xl text-3xl font-bold "
//                     >
//                         Add Task
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Home;

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedUser = localStorage.getItem("user");

        if (loggedUser) {
            setUser(JSON.parse(loggedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };
const handleAddTask = () => {
    if (!user) {
        navigate("/signup");
    } else {
        navigate("/AddTask");
    }
};

    return (
        <div className="min-h-screen bg-[#f5f5f5]">
            
            {/* Navbar */}
            <nav className="flex justify-between items-center px-12 pt-6">
                <h1 className="text-4xl font-bold">Todo App</h1>

                <div className="flex gap-4">

                    {/* IF USER LOGGED IN */}
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="w-[116px] h-[52px] bg-red-400 rounded-md text-sm font-medium cursor-pointer text-white"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/signup">
                                <button className="w-[116px] h-[52px] bg-[#D9D9D9] rounded-md text-sm font-medium cursor-pointer">
                                    Signup
                                </button>
                            </Link>

                            <Link to="/signin">
                                <button className="w-[116px] h-[52px] bg-[#D9D9D9] rounded-md text-sm font-medium cursor-pointer">
                                    SignIn
                                </button>
                            </Link>
                        </>
                    )}

                </div>
            </nav>

            {/* Hero Section */}
            <div className="flex justify-center mt-24">
                <div className="w-[818px] h-[495px] bg-[#EAEAEA] rounded-xl flex flex-col justify-center items-center">

                    <h2 className="text-[48px] font-bold text-[#7C4A4A] uppercase leading-tight text-center mb-12">
                        Add Your First Task
                        <br />
                        And Make Yourself
                        <br />
                        Be Easy
                    </h2>

                    <button
                        onClick={handleAddTask}
                        className="w-[359px] h-[84px] bg-[#D9D9D9] rounded-xl text-3xl font-bold cursor-pointer"
                    >
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;