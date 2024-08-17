import Component from "component";
import logo from "@/assets/img/logo.jpg";

export default function createFooter(): Component {
  const year = new Component({
    className: "header-title",
    text: "Created in 2024",
  });

  const logoWrapper = new Component({
    tag: "img",
    className: "school-logo",
  });
  logoWrapper.setAttribute("src", logo);

  return new Component(
    { tag: "footer", className: "main-footer" },
    year,
    logoWrapper,
  );
}
