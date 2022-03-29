function ProjectItem(props) {
  return (
    <>
      <li className="proj-display" style={{listStyle:'none'}}>
        <div>
          <h1>{props.title}</h1>
          <p>{props.description}</p>
        </div>
        <div>
          <button>View Project {'>'}</button>
        </div>
      </li>
    </>
    
  );
}

export default ProjectItem;
