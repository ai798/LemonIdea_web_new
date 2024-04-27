import mitt, { Emitter } from 'mitt';

type Events = {
  showLoginDialog?: object;
  showUnLoginDialog?: object;
};

const emitter: Emitter<Events> = mitt<Events>();

export default emitter;
