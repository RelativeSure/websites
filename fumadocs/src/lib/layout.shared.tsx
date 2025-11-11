import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
    return {
        nav: {
            title: "Rasmus Brøgger Jørgensen",
        },
        links: [
            {
                text: "Contact",
                url: "/docs/contact",
            },
            {
                text: "Tools",
                url: "https://tools.rasmusj.dk",
                external: true,
            },
            {
                text: "GitHub",
                url: "https://github.com/RelativeSure",
                external: true,
            },
            {
                text: "LinkedIn",
                url: "https://www.linkedin.com/in/rasmusbroeggerjoergensen/",
                external: true,
            },
            {
                text: "OneTimeSecret",
                url: "https://ots.broegger.dk",
                external: true,
            },
        ],
    };
}
