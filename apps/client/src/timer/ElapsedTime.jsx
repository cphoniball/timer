import React from 'react';
import PropTypes from 'prop-types';

import { formatSeconds } from './timer.utilities';

const ElapsedTime = ({ className, elapsedSeconds }) => (
    <div className={className}>{formatSeconds(elapsedSeconds)}</div>
);

ElapsedTime.propTypes = {
    className: PropTypes.string,
    elapsedSeconds: PropTypes.number
};

export default ElapsedTime;
