import Projects from ./projects.js;


const actions = {
    MODIFY_FILE: "MODIFY_FILE",
    VIEW_FILE: "VIEW_FILE",
    DELETE_FILE: "DELETE_FILE",
    CREATE_FILE: "CREATE_FILE"
  };
  
  const roles = {
    GROUPLEAD: "Group Leader",
    GROUPMEMBER: "Group Member"
  };
  
  export { actions, roles };

const roles.GROUPLEAD = {
  id: 1,
  title: user.Projects,
  authorId: user?.UID,
  accessLevel: "Group Leader",
  content: {...}
};

const roles.GROUPMEMBER = {
    id: 2,
    title: user.Projects,
    authorID: user?.UID, 
    accessLevel: "Group Member",
    content: {...}
};

export { actions, roles };