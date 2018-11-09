import {entityReducer} from "entity-fetcher";
import ui from "honeycomb-ui";

const {uploadEvidenceReducer} = ui;

export const rootReducer = (state = {}, action) => {
  return entityReducer(uploadEvidenceReducer(state, action), action);
};
