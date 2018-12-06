import axios from "axios";
import {Observable} from "rxjs";
import {entityActions} from "entity-fetcher";
import {createLeadCompleted} from "./LeadActions";

const printError = ({e, message}) => {
  if (e.response) {
    const {status, data} = e.response;
    console.error(message, status, data)
  } else {
    console.error(message);
    console.error(e);
  }
};

export const mapCreateEntityCompletedToCreateLeadCompleted = (action$, store, deps) => {
  return action$.ofType(entityActions.CREATE_ENTITY_COMPLETED)
    .filter(action => action.entityKey === "lead")
    .map(action => {
      const {entityAuthToken} = action;
      return createLeadCompleted(entityAuthToken, action.payload)
    })
};

export const propertyChanged = (action$, store, deps) => {
  const honeycombHeaders = deps && deps.honeycombHeaders;

  return action$.ofType("PROPERTY_CHANGED")
    .flatMap(action => {
      console.log("propertyChanged", action.payload);
      const {entityId, entityName, propertyName, innerPropertyName, endpoint, newValue, authToken, productId} = action.payload;
      const headers = honeycombHeaders || {};
      headers['Authorization'] = `Bearer ${authToken}`;
      let data = {[propertyName]: newValue};

      /*
       * When an innerProperty name is supplied then wrap the newValue. So the http body will look like this:
       * {
       *   propertyName: {
       *     innerPropertyName: newValue
       *   }
       * }
      */
      if (innerPropertyName) {
        data = {[propertyName]: {[innerPropertyName]: newValue}};
      }

      return Observable.fromPromise(
        axios.patch(`${endpoint}/${entityName}/${entityId}/${productId}`, data, {headers}))
        .mergeMap(() => Observable.empty())
        .catch((e) => {
          const message = `Something went wrong trying to update the ${propertyName}`;
          printError({e, message});
          return Observable.of({type: `${action.type}_FAILED`, message});
        });
    })
};
