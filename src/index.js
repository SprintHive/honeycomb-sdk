import React from 'react';

import {combineEpics} from 'redux-observable';

import honeycombUI from "honeycomb-ui";
import {leadFetcher} from "./leadFetcher/LeadFetcher";
import {configureReduxStore} from "./redux/ConfigureReduxStore";
import {getLeadIdFromUrl} from "./hocs/withLeadFromUrl";
import {loadPropFromUrl} from "./hocs/loadPropFromUrl";
import {entityEpics, entityFetcher, entityActions} from "entity-fetcher";
import {idvFetcher} from "./idvFetcher/idvFetcher";

import {CREATE_LEAD_COMPLETED, createLeadCompleted} from "./leadFetcher/LeadActions";
import {mapCreateEntityCompletedToCreateLeadCompleted, propertyChanged} from "./leadFetcher/LeadEpic";
import {sendRemoteActionsToServer, sendActionsFromServerToRedux} from "./subscriptions/SubscriptionEpic";
import {rootReducer} from "./redux/RootReducer";

const {hocs: uiHocs, addressInputReducer, addressInputEpics, monthlyExpenseEpics, uploadEvidenceEpics,
  uploadProofOfIncomeEpics, ...ui} = honeycombUI;

const epics = combineEpics(
  entityEpics,
  mapCreateEntityCompletedToCreateLeadCompleted,
  propertyChanged,
  sendRemoteActionsToServer,
  sendActionsFromServerToRedux,
  addressInputEpics,
  monthlyExpenseEpics,
  uploadEvidenceEpics,
  uploadProofOfIncomeEpics
);

const createLead = ({endpoint, data}) => entityActions.createEntity({
  entityKey: "lead",
  idField: "leadId",
  endpoint, data
});

const hocs = {
  getLeadIdFromUrl,
  loadPropFromUrl,
  ...uiHocs
};

const Honeycomb =  {
  hocs,
  ui,
  configureReduxStore,
  entityFetcher,
  leadFetcher,
  idvFetcher,
  epics,
  reducers: rootReducer,
  addressInputReducer,
  actions: {CREATE_LEAD_COMPLETED, createLeadCompleted, createLead}
};

module.exports = Honeycomb;

