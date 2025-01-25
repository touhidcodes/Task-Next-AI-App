// import prisma from "@/lib/db/prisma";
// // import { auth } from "@clerk/nextjs";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "FlowBrain - Notes",
// };

// export default async function NotesPage() {
//   const { userId } = auth();

//   if (!userId) throw Error("userId undefined");

//   const allNotes = await prisma.chat.findMany({ where: { userId } });

//   return <div>{JSON.stringify(allNotes)}</div>;
// }

"use client";

import { useChat } from "ai/react";

import { ChatContainer, ChatForm, ChatMessages } from "@/components/ui/chat";
import { MessageInput } from "@/components/ui/message-input";
import { MessageList } from "@/components/ui/message-list";
import { PromptSuggestions } from "@/components/ui/prompt-suggestions";
import { ChatMessage } from "@/components/ui/chat-message";

export default function CustomChat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading,
    stop,
  } = useChat();

  console.log(input, "ipmmmmmmmmmm");

  const lastMessage = messages.at(-1);
  const isEmpty = messages.length === 0;
  const isTyping = lastMessage?.role === "user";

  return (
    <ChatContainer>
      {isEmpty ? (
        <PromptSuggestions
          label="Next AI"
          append={append}
          suggestions={[
            "What is Next JS?",
            "Tell me a joke",
            "What is ChatGPT",
          ]}
        />
      ) : null}

      {!isEmpty ? (
        <ChatMessages messages={messages}>
          <MessageList messages={messages} isTyping={isTyping} />
        </ChatMessages>
      ) : null}

      <ChatForm
        className="mt-auto"
        isPending={isLoading || isTyping}
        handleSubmit={handleSubmit}
      >
        {({ files, setFiles }) => (
          <MessageInput
            value={input}
            onChange={handleInputChange}
            // allowAttachments
            files={files}
            setFiles={setFiles}
            stop={stop}
            isGenerating={isLoading}
            // enableInterrupt={true}
          />
        )}
      </ChatForm>
    </ChatContainer>
  );
}
