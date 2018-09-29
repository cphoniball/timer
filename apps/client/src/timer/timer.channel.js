import * as Phoenix from 'phoenix';

import store from 'redux/store';
import { actions as timeEntryActions } from 'timer/time_entries.redux';

export default function listen () {
    // TODO: Move out socket connection to a central location that is fired once for the application
    const socket = new Phoenix.Socket('ws://api.timer.test:4000/socket', {
        transport: WebSocket
    });

    socket.connect();

    // Join our channel and stop the timer if we receive that message
    const channel = socket.channel('time_entry:lobby', {});

    channel.on('start', payload => store.dispatch(timeEntryActions.insert(payload)));
    channel.on('stop', payload => store.dispatch(timeEntryActions.insert(payload)));

    channel.join()
        .receive('ok', res => console.log(`Joined channel`, res))
        .receive('error', res => console.log(`Unable to join channel`, res));
}

