import {Route, Routes} from "react-router-dom";
import Profile from "@/Components/Profile.tsx";
import {Login} from "@/Components/Login.tsx";
import {ProtectedRoute} from "@/Components/ProtectedRoute.tsx";
import Home from "@/Components/Home.tsx";
import {Logout} from "@/Components/Logout.tsx";
import NavBar from "@/Components/Navigation.tsx";

export function TBRouter() {

    return (
            <div className={"doggrfancy"}>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/travelplans" element={<ProtectedRoute><TravelPlans /></ProtectedRoute>} />
                    <Route path="/createplans" element={<ProtectedRoute><CreatePlans/></ProtectedRoute>}/>
                    <Route path="/Profile" element={<Profile/>}/>
                    <Route path={"/message"} element={<MessagePage/>}/>
                    <Route path={"/messagehistory"} element={<MessageHistory/>}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </div>
    );
}
