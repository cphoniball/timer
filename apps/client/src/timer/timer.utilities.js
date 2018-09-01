/**
 * Given a time entry duration in seconds, format the time into hours:minutes:seconds format
 *
 * @param seconds
 */
export const formatSeconds = duration => {
    const seconds = duration % 60;
    const hours = Math.floor((duration - seconds) / 3600);
    const minutes = (duration - seconds) / 60;

    return `${zeroPrefixed(hours)}:${zeroPrefixed(minutes)}:${zeroPrefixed(seconds)}`;
};

export const zeroPrefixed = number => {
    if (typeof number === 'number') number = '' + number;

    return number.length < 2 ? `0${number}` : number;
};
