import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import * as StompJs from "@stomp/stompjs";
import "./Chat.scss";

const Chat = () => {
  const getRoomId = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch("/chat/room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          receiverNickname: artist,
        }),
      });
      const data = await response.json();
      setChatRoomId(data.roomId);
    } catch (error) {
      alert("에러났어요.");
    }
  };

  const navigate = useNavigate();

  const { exhibitId } = useParams();
  const { me } = useParams();
  const { exhibitName } = useParams();
  const { artist } = useParams();

  const accessToken = localStorage.getItem("accessToken");
  const frameRef = useRef(null);

  const [client, setClient] = useState(null);
  const [chat, setChat] = useState(""); // 입력된 chat을 받을 변수
  const [chatList, setChatList] = useState([]); // 채팅 기록
  const [isConnect, setConnect] = useState("");
  const [chatRoomId, setChatRoomId] = useState("");

  const msgBox = chatList.map((msg, index) => {
    // 상대방의 채팅 내역일 경우
    if (String(msg.nickname) !== me) {
      return (
        <div key={index} className="otherChat">
          {/* 상대방 이미지 */}
          <div className="otherImg">
            <img src={msg.receiverProfileImg} alt="" />
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

  const connect = () => {
    // 소켓 연결
    try {
      const clientdata = new StompJs.Client({
        brokerURL: "ws://15.168.106.131:8081/ws/chat",
        connectHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
        debug: function (str) {
          // console.log(str); // 소켓 연결 정보
        },
        reconnectDelay: 5000, // 자동 재 연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      // 구독
      clientdata.onConnect = function () {
        clientdata.subscribe("/sub/chat/" + chatRoomId, callback); // 구독하면서, 받은 메시지 chatList에 자동 저장
      };

      clientdata.activate(); // 클라이언트 활성화
      setClient(clientdata); // 클라이언트 갱신
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
  const fetchChat = async (chatRoomId) => {
    try {
      const response = await fetch("/chat/room/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          roomId: chatRoomId,
        }),
      });
      const data = await response.json();
      setChatList(data);
    } catch (error) {
      console.error("Failed to fetch chat messages:", error);
    }
  };

  // 콜백함수 => ChatList 저장하기
  const callback = (message) => {
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
    getRoomId(); // 렌더링 시 roomId를 반환하여 chatRoomId에 저장한 후 pub/chat/{chatRoomId} 에 메시지를 보내야 함
  }, []);

  useEffect(() => {
    // chatRoomId가 설정되었을 때 connect() 함수 호출
    if (chatRoomId) {
      connect();
      setConnect(true);
      fetchChat(chatRoomId);
    }
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
            {exhibitName} / {"가격"}
          </div>
          <button className="Back" onClick={onClick}>
            돌아가기
          </button>
        </div>
        <div className="PrevMessages" ref={frameRef}>
          {msgBox}
        </div>
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
