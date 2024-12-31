import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import authStore from "./authStore";

export const messageStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isuserLoading: false,
  isMessagesLoading: false,
  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },
  getUsers: async () => {
    set({ isuserLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      // console.log(res.data);
      set({ users: res.data });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isuserLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (data) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        data
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log(error);
    }
  },
  subscribeToMessage: () => {
    const { selectedUser } = get();

    if (!selectedUser) return;

    const socket = authStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },
  unSubscribeToMessage: () => {
    const socket = authStore.getState().socket;
    socket.off("newMessage");
  },
}));
