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
    <form className="border-t border-ink bg-white p-4" onSubmit={handleSubmit}>
      <label htmlFor="team-message" className="sr-only">
        Write a team message
      </label>
      <div className="flex flex-col gap-3 rounded-[3px] border border-ink bg-white p-3 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink sm:flex-row sm:items-end">
        <textarea
          id="team-message"
          value={messageContent}
          maxLength={MAX_MESSAGE_LENGTH}
          rows={2}
          placeholder="Write a message to your team..."
          className="min-h-12 min-w-0 flex-1 resize-none bg-transparent text-sm leading-6 text-ink outline-none placeholder:text-muted"
          onChange={(event) => setMessageContent(event.target.value)}
        />
        <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
          <span className="font-mono text-[10px] text-muted">
            {messageContent.length}/{MAX_MESSAGE_LENGTH}
          </span>
          <button
            type="submit"
            disabled={isSendDisabled}
            className="retro-button disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Icon name="send" className="h-4 w-4" />
            Send
          </button>
        </div>
      </div>
    </form>
  );
}
