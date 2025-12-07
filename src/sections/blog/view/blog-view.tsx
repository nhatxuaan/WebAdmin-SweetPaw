// 1. React hooks
import { useState, useRef, useEffect } from "react";

// 3. MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// 4. Utils
import SocketAdmin from "src/utils/socketAdmin";

// 5. Layouts
import { DashboardChatContent } from "src/layouts/chat/chat-content";
import { apiGetAllChats, apiGetChatHistory } from "src/services/chatApi";

// 6. Components
import { ChatBox } from "src/sections/blog/ChatBox";

// 7. Types
import type { IPostItem } from "../post-item";





type Props = {
  posts: IPostItem[];
};


export function MessagesView({ posts }: Props) {
  console.log(" [MessagesView] Component render");

  const [chatList, setChatList] = useState<any[]>([]);
  const [messageList, setMessageList] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [inputMsg, setInputMsg] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // ==========================
  // INIT SOCKET + LOAD CHATS
  // ==========================
  useEffect(() => {
    console.log("[INIT] Khởi tạo socket admin…");

    const socket = SocketAdmin.init(import.meta.env.VITE_SOCKET_URL);

    socket.on("connect", () => {
      console.log("[SOCKET] Đã kết nối tới server socket!");
    });

    socket.on("disconnect", () => {
      console.log("[SOCKET] Mất kết nối tới server socket!");
    });

    socket.on("userMessage", (msg: any) => {
      console.log("[REALTIME] Có tin nhắn realtime từ user:", msg);
      if (msg.userId === selectedUser?._id) {
        console.log("[REALTIME] Tin nhắn thuộc user đang mở → thêm vào UI");

        setMessageList((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: msg.content,
            from: "user",
          },
        ]);
      } else {
        console.log("[REALTIME] Tin nhắn của user KHÁC, không hiển thị");
      }
    });

    // Load danh sách đoạn chat
    async function fetchChats() {
      console.log("[API] Gọi API lấy danh sách chat…");

      try {
        const res = await apiGetAllChats();
        console.log("[API] Kết quả apiGetAllChats:", res);
        setChatList(res?.data || []);
        console.log("[STATE] chatList đã cập nhật:", res?.data);
      } catch (err) {
        console.error("[API] Lỗi gọi apiGetAllChats:", err);
      }
    }

    fetchChats();
  }, []);

  // ==========================
  //  CLICK USER → LOAD CHAT HISTORY
  // ==========================
  const openChat = async (user: any) => {
    console.log("[OPEN CHAT] Chọn user:", user);

    setSelectedUser(user);

    console.log("[API] Gọi API lấy lịch sử chat của userID:", user._id);
    try {
      const res = await apiGetChatHistory(user._id);
      console.log("[API] Kết quả apiGetChatHistory:", res);

      setMessageList(
        res?.data?.messages?.map((m: any) => ({
          id: m._id,
          text: m.content,
          from: m.senderModel === "Admin" ? "me" : "user",
        })) || []
      );

      console.log("[STATE] messageList đã cập nhật");
    } catch (err) {
      console.error("[API] Lỗi lấy lịch sử chat:", err);
    }
  };

  // Scroll xuống cuối
  useEffect(() => {
    console.log("[SCROLL] Auto scroll to bottom");
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  // ==========================
  // 3) SEND MESSAGE
  // ==========================
  const sendMessage = async () => {
    console.log("[SEND] Gửi tin nhắn:", inputMsg);

    if (!inputMsg.trim() || !selectedUser) {
      console.log("[SEND] Không có user hoặc tin nhắn rỗng");
      return;
    }

    console.log("[SEND] Tính năng gửi tin nhắn đang bị comment");
  };

  return (
    <DashboardChatContent>
      <Box
        sx={{
          mt: 2,
          flex: 1,
          overflowY: "auto",
          pr: 1,
          display: "flex",
          gap: 2,
        }}
      >
        {/* =======================================
            SIDEBAR USER LIST
        ======================================= */}
        <Box
          sx={{
            width: "25%",
            background: "white",
            borderRadius: 2,
            p: 2,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 2 }}>
            TIN NHẮN
          </Typography>

          <input
            placeholder="Tìm kiếm"
            style={{
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />

          {/* LIST USER CHAT */}
          <Box
            sx={{
              mt: 2,
              flex: 1,
              overflowY: "auto",
              pr: 1,
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-thumb": {
                background: "#bfbfbf",
                borderRadius: "8px",
              },
            }}
          >
            {chatList.length === 0 && (
              <Typography sx={{ color: "#777", mt: 2 }}>
                Chưa có cuộc trò chuyện nào
              </Typography>
            )}

            {chatList.map((chat) => (
              <Box
                key={chat.user._id}
                onClick={() => openChat(chat.user)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  mb: 1.2,
                  borderRadius: 2,
                  cursor: "pointer",
                  background:
                    selectedUser?._id === chat.user._id ? "#e8f0fe" : "white",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  "&:hover": { background: "#f5f7fa" },
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                    {chat.user.name || "Người dùng"}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#666",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {chat.lastMessage || "Chưa có tin nhắn"}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* =======================================
            CHAT WINDOW
        ======================================= */}
        <Box
          sx={{
            flex: 1,
            background: "white",
            borderRadius: 2,
            p: 2,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          {/* HEADER */}
          <Box sx={{ pb: 1.5, borderBottom: "1px solid #eee" }}>
            <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
              {selectedUser ? selectedUser.name : "Chọn một cuộc trò chuyện"}
            </Typography>
          </Box>

          {/* CHAT BODY */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              mt: 2,
              mb: 2,
              pr: 1,
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-thumb": {
                background: "#bfbfbf",
                borderRadius: "8px",
              },
            }}
          >
            {selectedUser ? (
              messageList.map((msg) =>
                msg.from === "user" ? (
                  <Box key={msg.id} sx={{ display: "flex", gap: 1.5, mb: 2 }}>
                    <Box sx={{ width: 5, height: 40 }} />
                    <Box
                      sx={{
                        maxWidth: 320,
                        background: "white",
                        p: 1.5,
                        borderRadius: 2,
                        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      {msg.text}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    key={msg.id}
                    sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}
                  >
                    <Box
                      sx={{
                        maxWidth: 320,
                        background: "#4f8dfd",
                        color: "white",
                        p: 1.5,
                        borderRadius: 2,
                      }}
                    >
                      {msg.text}
                    </Box>
                  </Box>
                )
              )
            ) : (
              <Typography sx={{ color: "#777", mt: 3 }}>
                Hãy chọn một người để bắt đầu chat
              </Typography>
            )}

            <div ref={chatEndRef} />
          </Box>

          {/* INPUT */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <input
              placeholder="Nhập tin nhắn..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={!selectedUser}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #ccc",
                outline: "none",
                background: selectedUser ? "white" : "#f0f0f0",
              }}
            />

            <button
              onClick={sendMessage}
              disabled={!selectedUser}
              style={{
                background: selectedUser ? "#4f8dfd" : "#9bbcff",
                color: "white",
                padding: "12px 20px",
                borderRadius: "12px",
                border: "none",
                cursor: selectedUser ? "pointer" : "not-allowed",
              }}
            >
              Gửi
            </button>
          </Box>
        </Box>
      </Box>
    </DashboardChatContent>
  );
}