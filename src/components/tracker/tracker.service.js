import * as SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';

let stompClient = null;
let subscriber = null;

const sendActivity = () => {
  if (stompClient !== null && stompClient.connected) {
    const body = {};
    const header = {};
    stompClient.send('/topic/activity', JSON.stringify(body), header);
  }
};

const connect = () => {
  stompClient = Stomp.over(new SockJS('/websocket/tracker'));
  const headers = {};
  stompClient.connect(headers, () => {
    sendActivity();
  });
};

const disconnect = () => {
  if (stompClient !== null) {
    stompClient.disconnect();
    stompClient = null;
  }
};

const subscribe = () => {
  subscriber = stompClient.subscribe('/topic/tracker', (data) => {
    console.info(JSON.parse(data.body));
  });
};

const unsubscribe = () => {
  if (subscriber !== null) {
    subscriber.unsubscribe();
  }
};

export default {
  connect,
  disconnect,
  sendActivity,
  subscribe,
  unsubscribe
};
