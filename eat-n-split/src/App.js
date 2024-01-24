import { useState } from 'react';

const initialFriends = [
    {
        id: 118836,
        name: 'Clark',
        image: 'https://i.pravatar.cc/48?u=118836',
        balance: -7,
    },
    {
        id: 933372,
        name: 'Sarah',
        image: 'https://i.pravatar.cc/48?u=933372',
        balance: 20,
    },
    {
        id: 499476,
        name: 'Anthony',
        image: 'https://i.pravatar.cc/48?u=499476',
        balance: 0,
    },
];

export default function App() {
    const [showAddFriend, setAddFriendOpen] = useState(false);
    const [friendsList, setFriendsList] = useState(initialFriends);
    const [selectedFriend, setSelectedFriend] = useState(null);

    function handleAddFriend(friend) {
        setFriendsList((friendsList) => [...friendsList, friend]);
        setAddFriendOpen(false);
    }

    function handleSelectFriend(friend) {
        setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
        setAddFriendOpen(false);
    }

    return (
        <div className='app'>
            <div className='sidebar'>
                <FriendsList
                    friendsList={friendsList}
                    onSelectFriend={handleSelectFriend}
                    selectedFriend={selectedFriend}
                />

                {showAddFriend && (
                    <FormAddFriend onAddFriend={handleAddFriend} />
                )}

                <Button onClick={() => setAddFriendOpen((show) => !show)}>
                    {showAddFriend ? 'Close' : 'Add friend'}
                </Button>
            </div>
            {selectedFriend && <FormSplitBill friend={selectedFriend} />}
        </div>
    );
}

function FriendsList({ friendsList, onSelectFriend, selectedFriend }) {
    return (
        <ul>
            {friendsList.map((friend) => (
                <Friend
                    key={friend.id}
                    friend={friend}
                    onSelectFriend={onSelectFriend}
                    selectedFriend={selectedFriend}
                />
            ))}
        </ul>
    );
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
    const isSelected = friend.id === selectedFriend?.id;

    return (
        <li className={isSelected ? 'selected' : ''}>
            <img src={friend.image} alt={friend.name} />
            <h3>{friend.name}</h3>
            {friend.balance < 0 && (
                <p className='red'>
                    You owe {friend.name} ${Math.abs(friend.balance)}
                </p>
            )}
            {friend.balance > 0 && (
                <p className='green'>
                    {friend.name} owes you ${Math.abs(friend.balance)}
                </p>
            )}
            {friend.balance === 0 && <p>You and {friend.name} are even.</p>}
            <Button onClick={() => onSelectFriend(friend)}>
                {isSelected ? 'Close' : 'Select'}
            </Button>
        </li>
    );
}

function Button({ onClick, children }) {
    return (
        <button className='button' onClick={onClick}>
            {children}
        </button>
    );
}

function FormAddFriend({ onAddFriend }) {
    const [name, setName] = useState('');
    const [imageURL, setImageURL] = useState('https://i.pravatar.cc/48');

    function handleSubmit(e) {
        e.preventDefault();
        const id = crypto.randomUUID();

        const newFriend = {
            name,
            image: `${imageURL}?=${id}`,
            balance: 0,
            id,
        };
        setName('');
        setImageURL('https://i.pravatar.cc/48');

        onAddFriend(newFriend);
    }

    return (
        <form className='form-add-friend' onSubmit={handleSubmit}>
            <label>👴 Friend name</label>
            <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label>🖼️ Image URL</label>
            <input
                type='text'
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
            />

            <Button>Add</Button>
        </form>
    );
}

function FormSplitBill({ friend }) {
    return (
        <form className='form-split-bill'>
            <h2>Split a bill with {friend.name}</h2>

            <label>💰 Bill value</label>
            <input type='text' />

            <label>💵 Your expense</label>
            <input type='text' />

            <label>👴 {friend.name}'s expense</label>
            <input type='text' disabled />

            <label>🤑 Who is paying the bill?</label>
            <select>
                <option value='user'>You</option>
                <option value='friend'>{friend.name}</option>
            </select>

            <Button>Add</Button>
        </form>
    );
}
