import React from "react";
import { Layout, Header, Navigation, Content} from 'react-mdl';
import NavTabs from "./components/navTabs";
import {Link} from 'react-router-dom';
import {Jumbotron} from 'react-bootstrap';
import "./App.css";

function App() {
  return (
      <div className="demo-big-content">
        <Layout fixedHeader>
            <Header title={<a href="/" className="styleTitle">Google Books</a>} className="header-gradient" scroll>
                <Navigation id="linkTabs">
                    <Link to="/search">Search</Link>
                    <Link to="/saved">Saved</Link>
                </Navigation>
            </Header>
            <Jumbotron>
                <div className="alignCenter">
                    <h3>Google Books Search</h3>
                    <p>
                        Search and save books of interest!
                    </p>
                </div>
                </Jumbotron>
            <Content>
                <div className="page-content" />
                <NavTabs></NavTabs>
            </Content>
        </Layout>
    </div>
  );
}


export default App;
