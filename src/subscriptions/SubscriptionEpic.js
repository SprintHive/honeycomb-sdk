import {Subject, Observable} from "rxjs";

export function sendActionsFromServerToRedux(action$, store, {socket}) {
  const subject = new Subject();

  socket.on('actions', action => {
    subject.next(action);
  });

  return subject;
}

export function sendRemoteActionsToServer(action$, store, {socket}) {
  return action$.filter(action => action.meta && action.meta.remote)
    .switchMap(action => {
      socket.emit("actions", action);
      return Observable.empty();
    });
}