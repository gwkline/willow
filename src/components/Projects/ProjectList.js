import ProjectItem from "./ProjectItem";

function ProjectList(props) {
  return (
    <ul>
      {props.projects.map((project) => (
        <ProjectItem
          key={project.id}
          id={project.id}
          title={project.title}
          description={project.description}
        />
      ))}
    </ul>
  );
}

export default ProjectList;
