import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import * as StompJs from "@stomp/stompjs";
import "./PerChatRoom.scss";

const PerChatRoom = ({ chatRoom }) => {
  const accessToken = localStorage.getItem("accessToken");

  const location = useLocation();
  const navigate = useNavigate();

  const frameRef = useRef(null);

  let [client, changeClient] = useState(null);
  const [chat, setChat] = useState(""); // 입력된 chat을 받을 변수
  const [chatList, setChatList] = useState([]); // 채팅 기록
  const [isConnect, setConnect] = useState("");

  const chatRoomId = chatRoom.roomId;
  const me = localStorage.getItem("myNickName");

  const connect = () => {
    // 소켓 연결
    try {
      const clientdata = new StompJs.Client({
        brokerURL: "ws://13.208.178.255:8081/ws/chat",
        connectHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
        debug: function (str) {},
        reconnectDelay: 5000, // 자동 재 연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      // 구독
      clientdata.onConnect = function () {
        clientdata.subscribe("/sub/chat/" + chatRoomId, callback); // 구독하면서, 받은 메시지 chatList에 자동 저장
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

  const callback = function (message) {
    if (message.body) {
      let msg = JSON.parse(message.body);
      setChatList((chats) => [...chats, msg]);
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
        sender: me,
      }),
      header: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setChat("");
  };

  useEffect(() => {
    // chatRoomId가 설정되었을 때 connect() 함수 호출
    connect();
    setConnect(true);
    fetchChat(chatRoomId);
    return () => {
      disConnect();
      setConnect(false);
    };
  }, [chatRoomId]);

  useEffect(() => {
    const frameElement = frameRef.current;
    if (frameElement) {
      // 스크롤을 끝으로 이동
      frameElement.scrollTo({ top: frameElement.scrollHeight });
    }
  }, [chatList]);

  const onChangeChat = (e) => {
    setChat(e.target.value);
    e.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const fetchChat = function (chatRoomId) {
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
        setChatList(response); // response를 chatList에 바로 설정
      });
  };

  const msgBox = chatList.map((msg, index) => {
    console.log(msg);
    // 상대방의 채팅 내역일 경우
    if (String(msg.nickname) !== me) {
      return (
        <div key={index} className="otherChat">
          {/* 상대방 이미지 */}
          <div className="otherImg">
            <img src={msg.receiverProfileImg} alt="receiverProfileImg" />
          </div>
          {/* 상대방 채팅 내용 */}
          <div className="otherChatBox">
            <div className="otherMsg">
              <span>{msg.message}</span>
            </div>
            {/* 채팅 보낸 시각 */}
            <span className="otherChatTime">
              {String(msg.sendTime).split("T")[1].substring(0, 5)}
            </span>
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

  return (
    <div className="PerChatRoom">
      <div className="ReceiverInfo">
        <img className="ProfileImg" src={chatRoom.receiverProfileImg} />
        {chatRoom.receiverNickname}
      </div>
      <div className="Frame">
        <div className="PrevMessages" ref={frameRef}>
          {msgBox}
        </div>
        <div className="SendMessage">
          <form onSubmit={() => handleSubmit}>
            <input
              type="text"
              value={chat}
              onChange={onChangeChat}
              placeholder="메시지를 입력하세요."
              onKeyDown={(ev) => {
                if (ev.keyCode === 13) {
                  sendChat();
                  ev.preventDefault(); // 기본 제출 동작 방지
                  ev.stopPropagation(); // 이벤트 전파 방지
                }
              }}
              onClick={() => console.log("클릭")}
            />
            <button type="submit" onClick={(ev) => ev.stopPropagation()}>
              <IoSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PerChatRoom;
