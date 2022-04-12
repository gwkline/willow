import ProjectItem from "./ProjectItem";

function ProjectList(props) {
  return (
    <ul>
      {props.projects.map((project) => (
        <ProjectItem
          key={project.id}
          title={project.title}
          description={project.description}
          users={project.users}
          tasks={project.tasks}
          messages={project.messages}
        />
      ))}
    </ul>
  );
}

export default ProjectList;
