import React from 'react';
import './Home.scss';
import Hash from "../Components/Hash/Hash"
import Block from "../Components/Block/Block"
import Blockchain from "../Components/Blockchain/Blockchain"
import Distributed from "../Components/Distributed/Distributed"

function Home() {
	return (
        <div>
        <div>
            Home
        </div>
        <Hash/>
        <Block/>
        <Blockchain/>
        <Distributed/>
        </div>
    )
}

export default Home;