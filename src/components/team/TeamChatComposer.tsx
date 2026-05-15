import type { FormEvent } from "react";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { NewTeamMessage } from "@/types/team";

const MAX_MESSAGE_LENGTH = 240;

type TeamChatComposerProps = {
  readonly onSendMessage: (message: NewTeamMessage) => void;
};

export function TeamChatComposer({ onSendMessage }: TeamChatComposerProps) {
  const [messageContent, setMessageContent] = useState("");
  const trimmedMessage = messageContent.trim();
  const isSendDisabled = trimmedMessage.length === 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSendDisabled) {
      return;
    }

    onSendMessage({ content: trimmedMessage });
    setMessageContent("");
  }

  return (
    <form className="border-t border-slate-200 bg-white p-4" onSubmit={handleSubmit}>
      <label htmlFor="team-message" className="sr-only">
        Write a team message
      </label>
      <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-3 focus-within:border-slate-400 focus-within:bg-white sm:flex-row sm:items-end">
        <textarea
          id="team-message"
          value={messageContent}
          maxLength={MAX_MESSAGE_LENGTH}
          rows={2}
          placeholder="Write a message to your team..."
          className="min-h-12 flex-1 resize-none bg-transparent text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400"
          onChange={(event) => setMessageContent(event.target.value)}
        />
        <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
          <span className="text-xs font-semibold text-slate-400">
            {messageContent.length}/{MAX_MESSAGE_LENGTH}
          </span>
          <button
            type="submit"
            disabled={isSendDisabled}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <Icon name="send" className="h-4 w-4" />
            Send
          </button>
        </div>
      </div>
    </form>
  );
}
