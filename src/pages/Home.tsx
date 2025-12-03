import React from "react";

import Helmet from "../components/Helmet";
import PostList from "../components/home/PostList";
import SuggestionUser from "../components/home/SuggestionUser";



const Home: React.FC = () => {
  return (
    <Helmet title="Socito">
      <div className="home-wrapper">
        <div>
          <div className="post-wrapper">
            <PostList />
          </div>
        </div>
        <div className="suggestion-wrapper">
          <SuggestionUser />
        </div>
      </div>
    </Helmet>
  );
};
export default Home;
