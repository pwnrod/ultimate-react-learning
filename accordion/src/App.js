import { useState } from 'react';
import './styles.css';

const faqs = [
    {
        title: 'Where are these chairs assembled?',
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.',
    },
    {
        title: 'How long do I have to return my chair?',
        text: 'Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.',
    },
    {
        title: 'Do you ship to countries outside the EU?',
        text: 'Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!',
    },
];

export default function App() {
    return (
        <div className='App'>
            <Accordion data={faqs} />
        </div>
    );
}

function Accordion({ data }) {
    const [openItemIndex, setOpenItemIndex] = useState(null);

    return (
        <div className='accordion'>
            {data.map((el, i) => (
                <AccordionItem
                    openItemIndex={openItemIndex}
                    onOpen={setOpenItemIndex}
                    title={el.title}
                    num={i}
                    key={el.title}
                >
                    {el.text}
                </AccordionItem>
            ))}
            <AccordionItem
                openItemIndex={openItemIndex}
                onOpen={setOpenItemIndex}
                title='Example Title'
                num={23}
                key='Test Key'
            >
                <p>This is an example</p>
                <ul>
                    <li>This is a list</li>
                    <li>Just to demonstrate</li>
                    <li>That we can pass different things in here</li>
                </ul>
            </AccordionItem>
        </div>
    );
}

function AccordionItem({ num, title, openItemIndex, onOpen, children }) {
    const isOpen = num === openItemIndex;

    function handleToggle() {
        onOpen(isOpen ? null : num);
    }

    return (
        <div className={`item ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
            <p className='number'>{num < 9 ? `0${num}` : num + 1}</p>
            <p className='title'>{title}</p>
            <p className='icon'>{isOpen ? '-' : '+'}</p>
            {isOpen && <div className='content-box'>{children}</div>}
        </div>
    );
}
