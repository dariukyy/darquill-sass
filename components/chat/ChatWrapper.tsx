"use client";

import { trpc } from "@/app/trpc-client/client";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { Loader2 } from "lucide-react";

type ChatWrapperProps = {
  fileId: string;
};

function ChatWrapper({ fileId }: ChatWrapperProps) {
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    {
      fileId,
    },
    {
      refetchInterval: (data) => {
        const status = data.state.data;

        if (status === undefined) {
          return 500;
        } else {
          return status.status === "SUCCESS" || status.status === "FAILED"
            ? false
            : 501;
        }
      },
    }
  );

  if (isLoading)
    return (
      <div className="relative min-h-full bg-zinc-50 dlex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mt-28">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <h3 className="font-semibold text-xl">Loading...</h3>
            <p className="text-zinc-500 text-sm">
              We&apos;re preparing your PDF.
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
      <div className="flex-1 justify-between flex flex-col mb-28">
        <Messages />
      </div>
      <ChatInput />
    </div>
  );
}

export default ChatWrapper;
