export interface message {
    message: string;
    senderId: number;
    createdAt: string;
    isRead: boolean;
  }
  
export interface chatListTypes {
    chatRoomId: number;
    toUserName: string;
    toUserProfileImage: string;
    lastMessage: string;
    lastChatTime: string;
    unReadMessageCount: number;
  }