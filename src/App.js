function App() {
  return (
    <div>
      <h1>Willow</h1>

      <div className="header">
        <button className="pagelink">HomePage</button>
        <button className="pagelink">Create Project</button>
        <button className="pagelink">Projects</button>
        <button className="pagelink">Updates</button>
        <button className="pagelink">Messages</button>
        <button className="pagelink">Settings</button>
      </div>

      <div className="homepagecontents">
        <card>
          <h2>Projects</h2>
          <div>Placeholder Text for Projects</div>
        </card>
        <card>
          <h2>Messages</h2>
          <div>Placeholder Text for Messages</div>
        </card>
        <card>
          <h2>Updates</h2>
          <div>Placeholder Text for Updates</div>
        </card>
      </div>
    </div>
  );
}

export default App;
