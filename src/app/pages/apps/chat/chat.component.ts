import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, OnChanges, DoCheck } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { GroupUser, ChatUser, ContactModel } from './chat.model';
import { groupData, chatData, contactData } from './data';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

// Date Format
import { DatePipe } from '@angular/common';

// Light Box
import { Lightbox } from 'ngx-lightbox';
import { ChatService } from 'src/app/services/product/chat.service';
import { SignalRService } from 'src/app/services/signalR.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

/**
 * Chat Component
 */
export class ChatComponent implements OnInit,AfterViewInit,DoCheck {

  private _this: ChatComponent;
  chatData!: any;
  groupData!: GroupUser[];
  chatMessagesData!: any;
  contactData!: ContactModel[];
  formData!: UntypedFormGroup;
  usermessage!: string;
  isFlag: boolean = false;
  submitted = false;
  isStatus: string = 'online';
  isProfile: string = 'assets/images/users/avatar-2.jpg';
  username: any = 'Nguyễn Hoàng Hải';
  receiveId!: string;
  @ViewChild('scrollRef') scrollRef: any;
  isreplyMessage = false;
  emoji = '';

  images: { src: string; thumb: string; caption: string }[] = [];

  constructor(public signalrService: SignalRService,public formBuilder: UntypedFormBuilder, private lightbox: Lightbox, private offcanvasService: NgbOffcanvas, private datePipe: DatePipe, public chatService: ChatService) {
    this._this = this;
    for (let i = 1; i <= 24; i++) {
      const src = '../../../../assets/images/small/img-' + i + '.jpg';
      const caption = 'Image ' + i + ' caption here';
      const thumb = '../../../../assets/images/small/img-' + i + '-thumb.jpg';
      const item = {
        src: src,
        caption: caption,
        thumb: thumb
      };
      this.images.push(item);
    }
    this.getChatData();
    // this.getInfoMessenger();
  }
  ngDoCheck(): void {
    if(this.chatMessagesData) {
      this.scrollMessenger()
    }
  }

  async ngOnInit() {
    // Validation
    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });

    // Chat Data Get Function
    this._fetchData();

    this.onListScroll();

    this.signalrService.connection.on('DisplayMessage', (data: any) => {
      this._this.chatMessagesData.push(data)
    });

    // this.signalrService.connection.on('ToMe', (data: any) => {
    //   debugger
    //   data.align = 'right',
    //   this._this.chatMessagesData.push(data)
    // });
  }

  ngAfterViewInit() {
    this.scrollRef.SimpleBar.getScrollElement().scrollTop = 100;
  }

  // Chat Data Fetch
  async _fetchData() {
    this.groupData = groupData;
    this.contactData = contactData;
  }

  // hainh2
  async getInfoMessenger(receiveId: number) {
    var param = {
      receiver_Id: receiveId
    }
    this.chatMessagesData = await this.chatService.postInfoMessenger('/Messenger/InfoMessenger', param).toPromise();
  }

  // hainh2
  // Trước hết là lấy tất cả dữ liệu trong user
  async getChatData() {
    this.chatData = await this.chatService.getAll('/User/GetAll').toPromise();
  }

  onListScroll() {
    if (this.scrollRef !== undefined) {
      setTimeout(() => {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop = this.scrollRef.SimpleBar.getScrollElement().scrollHeight;
      }, 500);
    }
  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

  /**
   * Save the message in chat
   */
  messageSave() {
    const message = this.formData.get('message')!.value;
    // phần này là rep nên để đó chưa làm vội
    if (this.isreplyMessage == true) {
      var itemReplyList: any = document.getElementById("users-chat")?.querySelector(".chat-conversation-list");
      var dateTime = this.datePipe.transform(new Date(), "h:mm a");
      var chatReplyUser = (document.querySelector(".replyCard .replymessage-block .flex-grow-1 .conversation-name") as HTMLAreaElement).innerHTML;
      var chatReplyMessage = (document.querySelector(".replyCard .replymessage-block .flex-grow-1 .mb-0") as HTMLAreaElement).innerText;

      this.chatMessagesData.push({
        align: 'right',
        name: 'Marcus',
        replayName: chatReplyUser,
        replaymsg: chatReplyMessage,
        message,
        time: dateTime,
      });
      // scroll mess lên trên 
      this.onListScroll();

      // Set Form Data Reset
      this.formData = this.formBuilder.group({
        message: null,
      });
      this.isreplyMessage = false;

    }
    else { // h làm phần này
      if (this.formData.valid && message) {
        const messenger = {
          align: 'right',
          content: message,
          formattedDate: this.datePipe.transform(new Date(), "dd/MM/yyyy HH:mm:ss"),
          conversation_id: 1,
          receiver_Id: this.receiveId
        }
        // Message Push in Chat
        this.chatMessagesData.push(messenger);
        // lưu messenge vào csdl
        this.chatService.postInsertMessenger('/Messenger/InsertMessenger', messenger).subscribe(
          (res : any)  => {
              if(res.response > 0) {
                this.signalrService.connection
                .invoke('SendMessageToUser',localStorage.getItem('id'),this.receiveId,res.data,'DisplayMessage')
                .catch((error: any) => {
                  console.log(`SignalrDemoHub.Hello() error: ${error.toString()}`);
                  alert('SignalrDemoHub.Hello() error!, see console for details.');
                });
              }
            } 
        );
        this.onListScroll();
        // Set Form Data Reset
        this.formData = this.formBuilder.group({
          message: null,
        });
      }
    }
    document.querySelector('.replyCard')?.classList.remove('show');
    this.emoji = '';

    this.submitted = true;
  }

  /***
  * OnClick User Chat show
  */
  chatUsername(receiveId: number,name: string) {
    this.username = name;
    this.receiveId = receiveId.toString();
    this.getInfoMessenger(receiveId);    
  }

  scrollMessenger() {
    // Tìm đối tượng thanh scroll trong giao diện tin nhắn
    const parentElement: HTMLElement | null = document.getElementById('scrollMess');
    if (parentElement) {
      // Lấy phần tử con có class 'target-class' trong phần tử cha
      const targetElement: HTMLElement | null = parentElement.querySelector('.simplebar-content-wrapper');
      if (targetElement) {
        // Cuộn thanh scroll xuống cuối cùng
        targetElement.scrollTo(0, targetElement.scrollHeight);
      }
    }
  }

  /**
  * SidebarHide modal
  * @param content modal content
  */
  SidebarHide() {
    const recentActivity = document.querySelector('.user-chat');
    if (recentActivity != null) {
      recentActivity.classList.remove('user-chat-show');
    }
  }

  open(index: number): void {
    // open lightbox
    this.lightbox.open(this.images, index, {});
  }

  // Contact Search
  ContactSearch() {
    var input: any, filter: any, ul: any, li: any, a: any | undefined, i: any, txtValue: any;
    input = document.getElementById("searchContact") as HTMLAreaElement;
    filter = input.value.toUpperCase();
    ul = document.querySelectorAll(".chat-user-list");
    ul.forEach((item: any) => {
      li = item.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("p")[0];
        txtValue = a?.innerText;
        if (txtValue?.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    })
  }

  // Message Search
  MessageSearch() {
    var input: any, filter: any, ul: any, li: any, a: any | undefined, i: any, txtValue: any;
    input = document.getElementById("searchMessage") as HTMLAreaElement;
    filter = input.value.toUpperCase();
    ul = document.getElementById("users-conversation");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("p")[0];
      txtValue = a?.innerText;
      if (txtValue?.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  // Filter Offcanvas Set
  onChatInfoClicked(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }

  // Replay Message
  replyMessage(event: any, align: any) {
    this.isreplyMessage = true;
    document.querySelector('.replyCard')?.classList.add('show');
    var copyText = event.target.closest('.chat-list').querySelector('.ctext-content').innerHTML;
    (document.querySelector(".replyCard .replymessage-block .flex-grow-1 .mb-0") as HTMLAreaElement).innerHTML = copyText;
    var msgOwnerName: any = event.target.closest(".chat-list").classList.contains("right") == true ? 'You' : document.querySelector('.username')?.innerHTML;
    (document.querySelector(".replyCard .replymessage-block .flex-grow-1 .conversation-name") as HTMLAreaElement).innerHTML = msgOwnerName;
  }

  // Copy Message
  copyMessage(event: any) {
    navigator.clipboard.writeText(event.target.closest('.chat-list').querySelector('.ctext-content').innerHTML);
    (document.getElementById("copyClipBoard") as HTMLElement).style.display = "block";
    setTimeout(() => {
      (document.getElementById("copyClipBoard") as HTMLElement).style.display = "none";
    }, 1000);
  }

  // Delete Message
  deleteMessage(event: any) {
    event.target.closest('.chat-list').remove();
  }

  // Delete All Message
  deleteAllMessage(event: any) {
    var allMsgDelete: any = document.getElementById('users-conversation')?.querySelectorAll('.chat-list');
    allMsgDelete.forEach((item: any) => {
      item.remove();
    })
  }

  // Emoji Picker
  showEmojiPicker = false;
  sets: any = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set: any = 'twitter';
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any) {
    const { emoji } = this;
    const text = `${emoji}${event.emoji.native}`;
    this.emoji = text;
    this.showEmojiPicker = false;
  }

  onFocus() {
    this.showEmojiPicker = false;
  }
  onBlur() {
  }

  closeReplay() {
    document.querySelector('.replyCard')?.classList.remove('show');
  }

  /**
   * Delete Chat Contact Data 
   */
  delete(event: any) {
    event.target.closest('li')?.remove();
  }

}
