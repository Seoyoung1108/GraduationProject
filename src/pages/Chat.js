import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import queryString from "query-string";
import { IoSend } from "react-icons/io5";
import * as StompJs from "@stomp/stompjs";
import axios from "axios";
import "./Chat.scss";
//0513

const SOCKET_SERVER_URL = "ws://13.208.178.255:8081/ws/chat";

const Chat = () => {
  const myID = localStorage.getItem("myID");
  const myNickName = localStorage.getItem("myNickName");

  function getRoomId() {
    const accessToken = localStorage.getItem("accessToken");

    fetch("/chat/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        receiverEmail: "bbb", // receiverEmail 넣어주기."ms9648@naver.com"
        sender: myNickName,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.roomId);
        setChatRoomId(response.roomId);
        console.log("chatRoomId" + chatRoomId);
      })
      .catch(() => {
        alert("에러났어요.");
      });
  }
  const location = useLocation();
  const navigate = useNavigate();

  const me = location.state.me;
  const name = location.state.name;
  const artist = location.state.artist;

  const param = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("user_id");
  // const receiverEmail = getReceiverEmail(); 상대방 이메일 알아야 함.

  let [client, changeClient] = useState(null);
  const [chat, setChat] = useState(""); // 입력된 chat을 받을 변수
  const [chatList, setChatList] = useState([]); // 채팅 기록
  const [isConnect, setConnect] = useState("");
  const [chatRoomId, setChatRoomId] = useState(false);

  const msgBox = chatList.map((msg, index) => {
    // 상대방의 채팅 내역일 경우
    if (String(msg.sender.email) !== userId) {
      return (
        <div key={index} className="otherChat">
          {/* 상대방 이미지 */}
          <div className="otherImg">
            <img src="/favicon.ico" alt="" />
          </div>
          {/* 상대방 채팅 내용 */}
          <div className="otherChatBox">
            <div className="otherMsg">
              <span>{msg.message}</span>
            </div>
            {/* 채팅 보낸 시각 */}
            <span className="otherChatTime">{msg.message.sendTime}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div key={index} className="myChat">
          <div className="myChatBox">
            <span className="myChatTime">
              {String(msg.sendTime).split("T")[1].substring(0, 5)}
            </span>
            <div className="myMsg">
              <span>{msg.message}</span>
            </div>
          </div>
        </div>
      );
    }
  });

  const connect = () => {
    // 소켓 연결
    try {
      const clientdata = new StompJs.Client({
        brokerURL: "ws://13.208.178.255:8081/ws/chat",
        connectHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000, // 자동 재 연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      // 구독
      clientdata.onConnect = function () {
        clientdata.subscribe("/sub/chat/" + chatRoomId, callback);
      };

      clientdata.activate(); // 클라이언트 활성화
      changeClient(clientdata); // 클라이언트 갱신
    } catch (err) {
      console.log(err);
    }
  };

  const disConnect = () => {
    // 연결 끊기
    if (client === null) {
      return;
    }
    client.deactivate();
  };

  // 채팅 불러오기
  const fetchChat = function (chatRoomId) {
    console.log("fetchChat: " + chatRoomId);
    fetch("/chat/room/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        roomId: chatRoomId,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        //        console.log(response);
        for (let i = 0; i < response.length; i++) {
          chatList.push(response[i]);
        }
        console.log(chatList);
      });
  };
  // 콜백함수 => ChatList 저장하기
  const callback = function (message) {
    if (message.body) {
      let msg = JSON.parse(message.body);
      console.log(msg);
      setChatList((chats) => [...chats, msg]);
      console.log(chatList);
    }
  };

  const sendChat = () => {
    if (chat === "") {
      return;
    }
    client.publish({
      destination: "/pub/chat/" + chatRoomId,
      body: JSON.stringify({
        message: chat,
        sender: userId,
      }),
      header: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setChat("");
  };

  useEffect(() => {
    getRoomId(); // 렌더링 시 roomId를 반환하여 chatRoomId에 저장한 후 pub/chat/{chatRoomId} 에 메시지를 보내야 함
  }, []);

  useEffect(() => {
    // chatRoomId가 설정되었을 때 connect() 함수 호출
    if (chatRoomId) {
      connect();
      setConnect(true);
      console.log("useEffect | isConnect = true");
    }
    return () => {
      disConnect();
      setConnect(false);
      console.log("useEffect | isConnect = false");
    };
  }, [chatRoomId]);

  useEffect(() => {
    // isConnect가 1일 때 채팅 불러오기
    if (isConnect == true) {
      console.log("isConnect: " + isConnect);
      console.log("chatRoomId" + chatRoomId);
      fetchChat(chatRoomId);
    }
    return () => console.log("isConnect: " + isConnect);
  }, [isConnect]);

  const onChangeChat = (e) => {
    setChat(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const onClick = () => {
    navigate(-1);
  };

  return (
    <div className="Chat">
      <div className="Frame">
        <div className="Title">
          <div className="Who">
            <p>{artist}</p>
            {name} / {"가격"}
          </div>
          <button className="Back" onClick={onClick}>
            돌아가기
          </button>
        </div>
        <div className="PrevMessages">{msgBox}</div>
        <div className="SendMessage">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={chat}
              onChange={onChangeChat}
              placeholder="메시지를 입력하세요."
              onKeyDown={(ev) => {
                if (ev.keyCode === 13) {
                  sendChat();
                }
              }}
            />
            <button type="submit">
              <IoSend size={30} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
