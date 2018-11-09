import PropTypes from "prop-types";
import {compose, setDisplayName, withProps, setPropTypes} from "recompose";

export const loadPropFromUrl = propName => compose(
  setDisplayName("getLeadIdFromUrl"),
  setPropTypes({
    match: PropTypes.object.isRequired
  }),
  withProps(props => {
    return {[propName]: props.match.params[propName]};
  })
);