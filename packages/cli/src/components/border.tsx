export const EmptyBorder = {
  topLeft: "",
  bottomLeft: "",
  vertical: "",
  topRight: "",
  horizontal: "",
  bottomT: "",
  topT: "",
  cross: "",
  leftT: "",
  rightT: "",
};

export const Splitborder = {
  boder: ["left" as const, "right" as const],
  cutomBorderChar: {
    ...EmptyBorder,
    vetical: "│",
  },
};
