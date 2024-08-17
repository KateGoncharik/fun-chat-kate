import Component from "component";

export default function createAllUsersBlock(): Component {
  const activeUsers = new Component(
    { tag: "h3", className: "active-users-title", text: "Online" },
    new Component({
      className: "active-users",
    }),
  );

  const inactiveUsers = new Component(
    { tag: "h3", className: "inactive-users-title", text: "Offline" },
    new Component({
      className: "inactive-users",
    }),
  );

  return new Component({ className: "users" }, activeUsers, inactiveUsers);
}
