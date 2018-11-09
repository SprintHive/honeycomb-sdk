/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";
import {compose, setDisplayName, setPropTypes, mapProps} from "recompose";

import {entityFetcher} from "entity-fetcher";

export const leadFetcher = compose(
  setDisplayName("LeadFetcher"),
  setPropTypes({
    leadId: PropTypes.string,
    endpoint: PropTypes.string.isRequired,
    authToken: PropTypes.string
  }),
  mapProps(props => {
    const {leadId, endpoint, authToken, children} = props;
    return {
      entityKey: "lead",
      entityId: leadId,
      idField: "leadId",
      endpoint,
      authToken,
      children
    }
  }),
  entityFetcher
);

