/* eslint-disable no-unused-vars */
/**
 * WebSocket、SockJs、STOMP三者关系
 * 简而言之, WebSocket 是底层协议, SockJS 是 WebSocket 的备选方案, 也是底层协议, 而 STOMP 是基于 WebSocket(SockJS) 的上层协议.
 *
 * SockJs
 * 一些浏览器中缺少对 WebSocket 的支持, SocketJS 是一种备选解决方案.
 * SockJS 优先使用原生WebSocket, 如果在不支持 websocket 的浏览器中, 会自动降级为轮询的方式.
 * 它在浏览器和web服务器之间创建了一个低延迟、全双工、跨域通信通道.
 * SockJS所处理的URL是 "http://" 或 "https://" 模式, 而不是 "ws://" 和 "wss://".
 * 服务器通过 withSockJS() 方法来使用SockJS作为备用方法.
 *
 * STOMP(simple text-orientated messaging protocol)
 * 它是一种简单的面向文本的消息传递协议, 提供了一个可互操作的连接格式, 允许STOMP客户端与任意STOMP消息代理(Broker)进行交互.
 * STOMP协议由于设计简单, 易于开发客户端, 因此在多种语言和多种平台上得到广泛地应用.
 * STOMP协议并不是为websocket设计的, 它是属于消息队列的一种协议, 和amqp、jms平级.
 * 只不过由于它的简单性恰巧可以用于定义websocket的消息体格式. STOMP协议很多mq都已支持, 比如rabbitmq、activemq.
 * 很多语言也都有STOMP协议的解析client库. 可以这么理解, websocket结合STOMP相当于一个面向公网对用户比较友好的一种消息队列.
 */
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
    // console.info(JSON.parse(data.body));
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
