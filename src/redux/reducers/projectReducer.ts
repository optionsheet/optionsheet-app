import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECT_SUCCESS,
  UPDATE_PROJECT_SUCCESS,
  DELETE_PROJECT_SUCCESS
} from "../actions/actionTypes";
import { Project, ProjectSummaryModel } from "../../common/models/project";
import _ from "lodash";
import produce from "immer";

interface ProjectReducerState {
  projects: ProjectSummaryModel[];
  project: Project;
  tags: string[];
}

const initialState: Readonly<Partial<ProjectReducerState>> = {};

const getAllProjectTags = (projects: Project[]) => {
  return _.uniq(projects
    .map((project) => project.tags)
    .flat()
    .map((tag) => tag.toLowerCase()));
};

const projectReducer = produce((state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECTS_SUCCESS:
      state.projects = payload;
      state.tags = getAllProjectTags(payload);
      break;
    case GET_PROJECT_SUCCESS:
      state.project = payload;
      break;
    case UPDATE_PROJECT_SUCCESS:
      state.project = { ...state.project, ...payload };
      break;
    case DELETE_PROJECT_SUCCESS:
      delete state.project;
      break;
  }

  return state;
}, initialState);

export default projectReducer;