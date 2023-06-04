/**
 * Group User List
 */
 export interface GroupUser {
    name: string;
    unread?: string;
  }
  
  /**
   * Chat User List
   */
  export interface ChatUser {
    image?: string;
    name: string;
    status: string;
    unread?: string;
  }
  
  /**
   * Chat Message List
   */
   export interface ChatMessage {
    id?: any; 
    align?: string; // cần
    name?: any;     // cần
    profile?: any;  // cần : đây là ảnh cá nhân
    content?: any; 
    timestamp?: any; 
    sender_id?: any; 
    receiver_id?: any; 

    
    // chưa biết làm
    image?: string[]; // đây là gửi ảnh
    replayName?:any; 
    replaymsg?:any;
  }

  export class MessageResponse {
    public response = 0;
    public messenge = "";
  }

  /**
 * Contact List
 */
 export interface ContactModel {
  title: string;
  contacts: Array<{
    name?: any;
    profile?: string;
  }>;
}
  