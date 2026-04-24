import { replace, useLocation, useNavigate, useParams } from "react-router";
import { useTheme } from "../providers/theme";
import { useEffect } from "react";
import { SessionShell } from "../components/session-shell";

export function Session() {
  const { id } = useParams();

  return <SessionShell onSubmit={() => {}} inputDisabled loading />;
}
