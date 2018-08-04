import * as moment from 'moment';
import * as React from 'react';

import { formatSeconds } from './timer.utilities';

export interface Props {
    className?: string;
    elapsedSeconds: number;
}

const ElapsedTime: React.StatelessComponent<Props> = ({ className, elapsedSeconds }) => (
    <div className={className}>{formatSeconds(elapsedSeconds)}</div>
);

export default ElapsedTime;
