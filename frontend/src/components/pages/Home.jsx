import React from "react";
import Clients from "../Clients";
import AddClientModal from "../AddClientModal";
import Projects from "../Projects";
import AddProjectModal from "../AddProjectModal";
const Home = () => {
    return (
        <>
            <div className="d-flex gap-3 mb-4">
                <AddClientModal />
                <AddProjectModal />
            </div>
            <Clients />
            <Projects />
        </>
    );
};

export default Home;
