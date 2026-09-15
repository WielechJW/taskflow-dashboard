import type { TeamMessage } from "@/types/team";

type TeamMessageBubbleProps = {
  readonly message: TeamMessage;
};

export function TeamMessageBubble({ message }: TeamMessageBubbleProps) {
  return (
    <li className={`flex gap-3 ${message.isOwnMessage ? "justify-end" : "justify-start"}`}>
      {!message.isOwnMessage && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] border border-ink bg-white font-mono text-[10px] font-bold text-ink sm:h-10 sm:w-10">
          {message.author.initials}
        </div>
      )}

      <article
        className={`min-w-0 max-w-[85%] rounded-[3px] border border-ink px-4 py-3 sm:max-w-[70%] ${
          message.isOwnMessage
            ? "bg-ink text-white"
            : "bg-white text-ink shadow-[2px_2px_0_0_#1c1c1c]"
        }`}
      >
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="text-xs font-bold">
            {message.author.name}
          </h3>
          <time className={`font-mono text-[10px] ${message.isOwnMessage ? "text-white/70" : "text-muted"}`}>
            {message.sentAt}
          </time>
        </div>
        <p className="mt-2 break-words text-sm leading-6">{message.content}</p>
      </article>
    </li>
  );
}
