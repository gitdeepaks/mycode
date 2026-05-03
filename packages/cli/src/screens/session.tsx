import { replace, useLocation, useNavigate, useParams } from "react-router";
import { useTheme } from "../providers/theme";
import { useEffect, useState, useMemo } from "react";
import { z } from "zod";
import type { InferResponseType } from "hono/client";

import { UserMessage, BotMessage, ErrorMessage } from "../components/messages";

import { SessionShell } from "../components/session-shell";
import { useToast } from "../providers/toast";
import { apiClient } from "../lib/api-clients";
import { getErrorMessage } from "../lib/https-errors";

type SessionData = InferResponseType<
  (typeof apiClient.sessions)[":id"]["$get"],
  200
>;

const sessionLocationSchema = z.object({
  session: z.custom<SessionData>(
    (val) => val != null && typeof val === "object" && "id" in val,
  ),
});

function ChatMessage({ msg }: { msg: SessionData["messages"][number] }) {
  if (msg.role === "USER") {
    return <UserMessage message={msg.content} />;
  }
  if (msg.role === "ERROR") {
    return <ErrorMessage message={msg.content} />;
  }

  return <BotMessage content={msg.content} model={msg.model} />;
}

export function Session() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  /** Session passed through router state when navigating from NewSession (includes messages). */
  const prefetched = useMemo(() => {
    const parsed = sessionLocationSchema.safeParse(location.state);
    if (!parsed.success) return null;
    const s = parsed.data.session;
    if (id && s.id !== id) return null;
    return s;
  }, [location.state, id]);

  const [loadedSession, setLoadedSession] = useState<SessionData | null>(null);

  useEffect(() => {
    if (prefetched) return;
    setLoadedSession(null);

    if (!id) return;

    let ignore = false;

    const fetchedSession = async () => {
      try {
        const res = await apiClient.sessions[":id"]["$get"]({
          param: { id: id },
        });
        if (ignore) return;
        if (!res.ok) {
          throw new Error(await getErrorMessage(res));
        }
        const resolvedSession = await res.json();
        if (ignore) return;
        setLoadedSession(resolvedSession);
      } catch (err) {
        if (ignore) return;
        toast.show({
          variant: "error",
          messages:
            err instanceof Error ? err.message : "Failed to fetch session",
        });
        navigate("/", { replace: true });
      }
    };
    fetchedSession();
    return () => {
      ignore = true;
    };
  }, [id, navigate, toast, prefetched]);

  const session = prefetched ?? loadedSession;

  if (!session) {
    return <SessionShell onSubmit={() => {}} inputDisabled loading />;
  }

  return (
    <SessionShell onSubmit={() => {}} inputDisabled>
      {session.messages.map((message) => (
        <ChatMessage key={message.id} msg={message} />
      ))}
    </SessionShell>
  );
}
