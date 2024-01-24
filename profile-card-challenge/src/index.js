import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const skills = [
    {
        skill: 'HTML+CSS',
        level: 'advanced',
        color: 'blue',
    },
    {
        skill: 'JavaScript',
        level: 'advanced',
        color: 'yellow',
    },
    {
        skill: 'Web Design',
        level: 'advanced',
        color: 'green',
    },
    {
        skill: 'Git and Github',
        level: 'intermediate',
        color: 'red',
    },
    {
        skill: 'React',
        level: 'advanced',
        color: 'purple',
    },
    {
        skill: 'Svelte',
        level: 'beginner',
        color: 'orange',
    },
];

function App() {
    return (
        <div className='card'>
            <Avatar
                url={`https://picsum.photos/450/200?random=${Math.random()}`}
            />
            <div className='data'>
                <Intro />
                <SkillList />
            </div>
        </div>
    );
}

function Avatar({ url }) {
    return <img className='avatar' src={url} />;
}

function Intro() {
    return (
        <>
            <h1>Caylin James</h1>
            <p>
                Full-stack web developer and teach at Udemy. When not coding or
                preparing a course, I like to play board games, to cook (and
                eat), or to just enjoy the Portuguese sun at the beach.
            </p>
        </>
    );
}

function SkillList() {
    return (
        <div className='skill-list'>
            {skills.map((skill) => {
                let emoji = '';

                if (skill.level == 'advanced') {
                    emoji = '💪';
                } else if (skill.level == 'intermediate') {
                    emoji = '👍';
                } else {
                    emoji = '👶';
                }

                return (
                    <Skill
                        key={skill.skill}
                        text={skill.skill}
                        emoji={emoji}
                        bgColor={skill.color}
                    />
                );
            })}
        </div>
    );
}

function Skill({ text, emoji, bgColor }) {
    return (
        <span className='skill' style={{ backgroundColor: bgColor }}>
            {text} {emoji}
        </span>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
