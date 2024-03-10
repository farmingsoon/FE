export interface message {
    message: string;
    chatId: number;
    senderId: number;
    createdAt: string;
    isRead: boolean;
    type: string;
  }
  
export interface chatListTypes {
    chatRoomId: number;
    toUserName: string;
    toUserProfileImage: string;
    lastMessage: string;
    lastChatTime: string;
    unReadMessageCount: number;
  }