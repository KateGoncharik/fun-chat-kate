import Component from "component";

export default function createAboutPage(): Component {
  const authorBlock = new Component(
    { className: "author-block-wrapper", text: "Made by: Kate Goncharik" },
    new Component({ className: "author-block" }),
  );
  return new Component(
    {
      className: "about-wrapper",
      text: "About",
    },
    authorBlock,
    new Component({ tag: "h1", className: "about-title", text: "Fun chat" }),
    new Component({
      tag: "p",
      className: "project-description",
      text: "This app is perfect for communicating with your friends. Here you can log in, choose a dialog with somebody and send some messages!",
    }),
  );
}
