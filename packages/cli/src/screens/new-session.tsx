import { replace, useLocation, useNavigate } from "react-router";
import { useTheme } from "../providers/theme";
import { useEffect } from "react";
import { SessionShell } from "../components/session-shell";
import { ErrorMessage, BotMessage, UserMessage } from "../components/messages";

export function NewSession() {
  const navigate = useNavigate();
  const location = useLocation();
  const { colors } = useTheme();

  const state = location.state as { message?: string } | null;

  useEffect(() => {
    if (!state?.message) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  if (!state?.message) return null;

  return (
    <SessionShell onSubmit={() => {}} inputDisabled loading={true}>
      <UserMessage message={state.message} />
      <BotMessage
        content="This is a simple bot response to demonstrate the UI. It is not a real bot."
        model="opus-4-7"
      />
      <ErrorMessage message="Oops" />
    </SessionShell>
  );
}
