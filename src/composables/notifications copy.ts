import { reactive } from "vue";

export const state = reactive({
  notifications: [] as object[],
});

let count = 0;

const generateId = () => {
  count = count + 1;
  return count;
};

export const methods = {
  notify(notification: any, timeout: number) {
    notification.id = generateId();
    state.notifications.push(notification);
    setTimeout(() => {
      this.removeNotification(notification.id);
    }, timeout || 5000);
  },

  new(notification: any, timeout: number) {
    this.notify(notification, timeout);
  },

  success(notification: any, timeout: number) {
    this.notify(notification, timeout);
  },

  error(notification: any, timeout: number) {
    this.notify(notification, timeout);
  },

  removeNotification(id: number) {
    state.notifications.splice(
      state.notifications.findIndex((n: any) => n.id === id),
      1
    );
  },

  removeAllNotification() {
    state.notifications = [];
  },
};

export let apiNotification = {
  new: (data: any, timeout: number) => methods.new(data, timeout),
  success: (data: any, timeout: number) => methods.success(data, timeout),
  error: (data: any, timeout: number) => methods.error(data, timeout),
  remove: (id: number) => methods.removeNotification(id),
  removeAll: () => methods.removeAllNotification(),
};
