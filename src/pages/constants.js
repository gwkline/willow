import Projects from "./projects.js";


const actions = {
    MODIFY_FILE: "MODIFY_FILE",
    VIEW_FILE: "VIEW_FILE",
    DELETE_FILE: "DELETE_FILE",
    CREATE_FILE: "CREATE_FILE",
    ADD_USER: "ADD_USER",
    REMOVE_USER: "REMOVE_USER",
    MANAGE_ROLES: "MANAGE_ROLES",
    ASSIGN_TASKS: "ASSIGN_TASKS",
    CHANGE_STATUS: "CHANGE_STATUS"
  };
  
  const roles = {
    GROUPLEAD: "Group Leader",
    GROUPMEMBER: "Group Member"
  };
  
  export { actions, roles };

roles.GROUPLEAD = {
  id: 1,
  title: user.Projects,
  authorId: user?.UID,
  accessLevel: "Group Leader"
  //content: {...}
};

roles.GROUPMEMBER = {
    id: 2,
    title: user.Projects,
    authorID: user?.UID, 
    accessLevel: "Group Member"
    //content: {...}
};

export { actions, roles };