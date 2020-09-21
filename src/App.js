import React from "react";
import Accordion from "./components/Accordion";
import 'semantic-ui-css/semantic.min.css';

const items = [
    {
        title: "What is react",
        content: "React is a Front-End Java`script framework"
    },
    {
        title: "Why use React",
        content: "React is favorite JS library among engineers."
    },
    {
        title: "How do you use React",
        content: "You use React by creating components."
    }
]

export default () => {
    return (
        <div>
            <Accordion
                items={items}

            />
        </div>
    )
}
