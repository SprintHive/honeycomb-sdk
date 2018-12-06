/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import {compose, withProps, setDisplayName, setPropTypes} from "recompose";
import PropTypes from "prop-types";
import {entityFetcher} from "entity-fetcher";

export const idvFetcher = compose(
  setDisplayName("IdvFetcher"),
  setPropTypes({
    identityVerificationId: PropTypes.string,
    endpoint: PropTypes.string.isRequired,
    authToken: PropTypes.string
  }),
  withProps(props => {
    const {identityVerificationId, endpoint, authToken} = props;
    return {
      entityKey: "identityVerification",
      entityId: identityVerificationId,
      idField: "identityVerificationId",
      endpoint,
      authToken
    }
  }),
  entityFetcher
);

