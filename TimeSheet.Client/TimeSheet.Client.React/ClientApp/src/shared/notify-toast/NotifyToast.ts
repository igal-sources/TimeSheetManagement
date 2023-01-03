import notify from "devextreme/ui/notify";

export const NotifyToast = (notifyMessage: string) => {
  return notify(
    {
      message: notifyMessage,
      width: 300,
      position: "center",
      shading: true,
    },
    "success",
    2000
  );
};
