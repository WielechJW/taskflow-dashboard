"use client";

import { useMemo, useState } from "react";
import { TeamChatComposer } from "@/components/team/TeamChatComposer";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import { TeamMessageBubble } from "@/components/team/TeamMessageBubble";
import { currentUser, initialTeamMessages, teamMembers } from "@/services/mockTeamChat";
import type { NewTeamMessage, TeamMessage } from "@/types/team";

function formatCurrentMessageTime(): string {
  return new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

export function TeamChatWorkspace() {
  const [messages, setMessages] = useState<readonly TeamMessage[]>(initialTeamMessages);
  const onlineMemberCount = useMemo(
    () => teamMembers.filter((member) => member.status === "online").length,
    [],
  );

  function handleSendMessage(message: NewTeamMessage) {
    const nextMessage: TeamMessage = {
      id: `message-${Date.now()}`,
      author: currentUser,
      content: message.content,
      sentAt: formatCurrentMessageTime(),
      isOwnMessage: true,
    };

    setMessages((currentMessages) => [...currentMessages, nextMessage]);
  }

  return (
    <section aria-labelledby="team-chat-title" className="space-y-6">
      <div className="border-b-2 border-ink pb-6">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="retro-eyebrow">Teams / Stay in the loop</p>
            <h1 id="team-chat-title" className="retro-title mt-3">
              Good work starts with a conversation.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
              Share updates, work through ideas, and keep your team on the same page.
            </p>
          </div>
          <aside className="rounded-[3px] border border-ink bg-white p-4">
            <p className="retro-eyebrow">Team pulse</p>
            <p className="mt-2 font-display text-xl text-ink">{onlineMemberCount} online now</p>
            <p className="mt-2 text-xs leading-5 text-muted">
              Your project crew, one conversation away.
            </p>
          </aside>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <section className="retro-panel flex min-h-[36rem] overflow-hidden">
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex flex-col gap-3 border-b border-ink p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-2xl text-ink">Launch room</h2>
                <p className="mt-1 font-mono text-[10px] text-muted">
                  {messages.length} messages · Daily planning channel
                </p>
              </div>
              <span className="retro-badge w-fit">
                Team channel
              </span>
            </header>

            <ol className="flex-1 space-y-5 overflow-y-auto bg-surface p-4 sm:p-6" aria-label="Team messages" aria-live="polite" aria-relevant="additions">
              {messages.map((message) => (
                <TeamMessageBubble key={message.id} message={message} />
              ))}
            </ol>

            <TeamChatComposer onSendMessage={handleSendMessage} />
          </div>
        </section>

        <aside className="retro-panel space-y-4 self-start p-5">
          <div className="border-b border-ink pb-4">
            <h2 className="font-display text-xl text-ink">The people</h2>
            <p className="mt-1 text-xs leading-5 text-muted">Your teammates in the launch room.</p>
          </div>
          <ul className="space-y-3">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
