import React from "react";
import leaf from "../images/leaf.png";
import Comments from "../Comments/Comments";

function Home() {
  return (
    <div>
      <div className="homepagecontents">
        <card>
          <h2>Welcome to Willow</h2>
          <div>Your brand new project management tool</div>
          <div>Willow helps you create projects, assign tasks, and stay on top of solo or collaborative projects!</div>
          <div>To look at your existing projects or to create a new one, navigate over to our "Projects" tab</div>
          <div>Try our invitation feature!</div>
          <div><Comments
            commentsUrl="http://localhost:3004/comments"
            currentUserId="1"
      /></div>
          <div>
            <img src={leaf} alt="img" height={45} width={45}></img>
            <h1>Willow</h1>
          </div>
        </card>
      </div>
    </div>
  );
};

export default Home;
