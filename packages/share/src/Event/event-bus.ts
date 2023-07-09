type Fn = (...args: any[]) => void

class EventBus {
  events: Record<string, Fn[]> = {};

  constructor() { }

  emit(eventName: string, data?: any) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function (fn) {
        fn(data);
      });
    }
  }

  on(eventName: string, fn: Fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  }

  off(eventName: string, fn: Fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  }
}

export const Bus = new EventBus();
