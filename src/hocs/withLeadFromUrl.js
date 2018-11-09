import PropTypes from "prop-types";
import {compose, setDisplayName, withProps, setPropTypes} from "recompose";

export const getLeadIdFromUrl = compose(
  setDisplayName("getLeadIdFromUrl"),
  setPropTypes({
    match: PropTypes.object.isRequired
  }),
  withProps(props => {
    const leadId = props.match.params.leadId;
    return {leadId};
  })
);