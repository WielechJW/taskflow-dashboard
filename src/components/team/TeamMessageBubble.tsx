import type { TeamMessage } from "@/types/team";

type TeamMessageBubbleProps = {
  readonly message: TeamMessage;
};

export function TeamMessageBubble({ message }: TeamMessageBubbleProps) {
  return (
    <li className={`flex gap-3 ${message.isOwnMessage ? "justify-end" : "justify-start"}`}>
      {!message.isOwnMessage && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-200 text-xs font-bold text-slate-700">
          {message.author.initials}
        </div>
      )}

      <article
        className={`max-w-[85%] rounded-3xl px-4 py-3 shadow-sm sm:max-w-[70%] ${
          message.isOwnMessage
            ? "rounded-br-md bg-slate-950 text-white shadow-slate-300/70"
            : "rounded-bl-md border border-slate-200 bg-white text-slate-700 shadow-slate-200/70"
        }`}
      >
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className={`text-sm font-bold ${message.isOwnMessage ? "text-white" : "text-slate-900"}`}>
            {message.author.name}
          </h3>
          <time className={`text-xs font-semibold ${message.isOwnMessage ? "text-slate-300" : "text-slate-400"}`}>
            {message.sentAt}
          </time>
        </div>
        <p className="mt-2 text-sm leading-6">{message.content}</p>
      </article>
    </li>
  );
}
