import { Conversation } from "../entities/conversation";
import { Message } from "../entities/message";
import { User } from "../entities/user";

export const generateExpire=()=>{
    return 86400000
  }
  
  
  export const DivideMessagesIntoTwoCategory = (
    messages: Message[],
    id: number
  ) => {
    let newMessage;
  
    const messagesType = messages.map((message) => {
      return message.user.id === id
        ? { ...message, type: "create" }
        : { ...message, type: "replay" };
    });
    return messagesType;
  };
  
  export const getConversationsImg = (
    conversations: Conversation[],
    user: User
  ) => {
    const conversationsAfterAddImgeUrl = conversations.map((conversation) => {
      return conversation.users.length > 2
        ? {
            ...conversation,
            ImgUrl:
              "https://c8.alamy.com/comp/KN9E89/teamwork-a-group-of-icon-people-standing-in-a-circle-KN9E89.jpg",
            name: conversation.title,
          }
        : conversation.users[0].id === user.id
        ? {
            ...conversation,
            ImgUrl: conversation.users[1].ImgUrl,
            name: `${conversation.users[1].firstName} ${conversation.users[1].lastName}`,
          }
        : {
            ...conversation,
            ImgUrl: conversation.users[0].ImgUrl,
            name: `${conversation.users[0].firstName} ${conversation.users[0].lastName}`,
          };
    });
    return conversationsAfterAddImgeUrl;
  };
  
  export const getConversationImg = (conversation: Conversation, user: User) => {
    const conversationAfterAddImgeUrl =
      conversation.users.length > 2
        ? {
            ...conversation,
            ImgUrl:
              "https://c8.alamy.com/comp/KN9E89/teamwork-a-group-of-icon-people-standing-in-a-circle-KN9E89.jpg",
            name: conversation.title,
          }
        : conversation.users[0].id === user.id
        ? {
            ...conversation,
            ImgUrl: conversation.users[1].ImgUrl,
            name: `${conversation.users[1].firstName} ${conversation.users[1].lastName}`,
          }
        : {
            ...conversation,
            ImgUrl: conversation.users[0].ImgUrl,
            name: `${conversation.users[0].firstName} ${conversation.users[0].lastName}`,
          };
  
    return conversationAfterAddImgeUrl;
  };
  