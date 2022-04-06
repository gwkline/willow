import { actions, roles } from "./constants.js";

const mappings = new Map();

mappings.set(actions.MODIFY_FILE, [roles.GROUPLEAD, roles.GROUPMEMBER]);
mappings.set(actions.VIEW_FILE, [roles.GROUPLEAD, roles.GROUPMEMBER]);
mappings.set(actions.DELETE_FILE, [roles.GROUPLEAD]);
mappings.set(actions.CREATE_FILE, [roles.GROUPLEAD, roles.GROUPMEMBER]);
mappings.set(actions.ADD_USER, [roles.GROUPLEAD]);
mappings.set(actions.REMOVE_USER, [roles.GROUPLEAD]);
mappings.set(actions.MANAGE_ROLES, [roles.GROUPLEAD]);
mappings.set(actions.ASSIGN_TASKS, [roles.GROUPLEAD]);
mappings.set(actions.CHANGE_STATUS, [roles.GROUPLEAD, roles.GROUPMEMBER]);
