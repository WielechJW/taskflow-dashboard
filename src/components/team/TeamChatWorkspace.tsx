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
      <div className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl shadow-slate-300/70">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-indigo-200">Teams</p>
            <h1 id="team-chat-title" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Chat with your project team and keep task decisions in one place.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              Send quick updates, coordinate owners, and keep launch conversations close to the task workspace.
            </p>
          </div>
          <aside className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <p className="text-sm font-semibold text-indigo-100">Team pulse</p>
            <p className="mt-2 text-2xl font-bold">{onlineMemberCount} online now</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Lightweight local chat state is ready for a future real-time backend integration.
            </p>
          </aside>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_20rem]">
        <section className="flex min-h-[42rem] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-200/70">
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Launch room</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {messages.length} messages · Daily planning channel
                </p>
              </div>
              <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                Live locally
              </span>
            </header>

            <ol className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4 sm:p-6" aria-label="Team messages">
              {messages.map((message) => (
                <TeamMessageBubble key={message.id} message={message} />
              ))}
            </ol>

            <TeamChatComposer onSendMessage={handleSendMessage} />
          </div>
        </section>

        <aside className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Channel members</h2>
            <p className="mt-1 text-sm text-slate-500">People involved in today&apos;s delivery decisions.</p>
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
