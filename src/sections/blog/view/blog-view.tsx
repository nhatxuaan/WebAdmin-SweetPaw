import { useState, useRef, useEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { DashboardChatContent } from "src/layouts/chat/chat-content";

import { ChatBox } from "src/sections/blog/ChatBox";

import type { IPostItem } from "../post-item";

type Props = {
  posts: IPostItem[];
};

export function MessagesView({ posts }: Props) {
  const [messageList, setMessageList] = useState([
    { id: 1, text: "Xin chào shop. Mình muốn mua bánh vị ngọt và có trái cây tươi...", from: "user" },
    { id: 2, text: "Hiện tại shop có bánh matcha phủ trái cây ạ...", from: "me" },
    { id: 3, text: "Bánh đẹp quá, mình muốn ghi thêm lời chúc được không ạ?", from: "user" },
  ]);

  const [inputMsg, setInputMsg] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // ===== AUTO SCROLL TO BOTTOM =====
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  const sendMessage = () => {
    if (inputMsg.trim() === "") return;

    setMessageList((prev) => [...prev, { id: Date.now(), text: inputMsg, from: "me" }]);
    setInputMsg("");
  };

  return (
    <DashboardChatContent>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          gap: 2,
          p: 2,
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* ===== SIDEBAR USER ===== */}
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
            {[1, 2, 3, 4, 5].map((i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  mb: 1.2,
                  borderRadius: 2,
                  background: "#fff",
                  cursor: "pointer",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  "&:hover": { background: "#f5f7fa" },
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                    Người dùng {i}
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
                    Tin nhắn gần đây...
                  </Typography>
                </Box>
                
              </Box>
            ))}
          </Box>
        </Box>

        {/* ===== KHUNG CHAT ===== */}
        <Box
          sx={{
            flex: 1,
            background: "white",
            borderRadius: 2,
            p: 2,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          {/* HEADER */}
          <Box sx={{ pb: 1.5, borderBottom: "1px solid #eee" }}>
            <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
              Võ Hà Khả Hân
            </Typography>
            {/* <Typography sx={{ fontSize: 12, color: "green" }}>Online</Typography> */}
          </Box>

          {/* ===== BODY CHAT (SCROLL) ===== */}
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
            {messageList.map((msg) =>
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
                <Box key={msg.id} sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
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
            )}

            {/* AUTO SCROLL POINT */}
            <div ref={chatEndRef} />
          </Box>

          {/* ===== INPUT ===== */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <input
              placeholder="Nhập tin nhắn..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                background: "#4f8dfd",
                color: "white",
                padding: "12px 20px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
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
