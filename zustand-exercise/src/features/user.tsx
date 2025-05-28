import { useState } from 'react';
import { useUserStore } from '../stores/user.store';

const hobbiesOptions = ['Reading', 'Gaming', 'Cooking', 'Running', 'Swimming'];

const User = () => {
  const users = useUserStore((state) => state.users);
  const addUser = useUserStore((state) => state.addUser);
  const deleteUser = useUserStore((state) => state.deleteUser);

  // Form state
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState<number>(0);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

  const handleHobbyChange = (hobby: string) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby)
        ? prev.filter((h) => h !== hobby)
        : [...prev, hobby]
    );
  };

  const handleAddUser = () => {
    if (!firstname || !lastname || age <= 0) return alert('Fill all fields');
    addUser({ firstname, lastname, age, hobbies: selectedHobbies });

    // Reset form
    setFirstname('');
    setLastname('');
    setAge(0);
    setSelectedHobbies([]);
  };

  return (
    <div className="p-4 max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold">User List</h1>

      <ul className="space-y-2">
        {users.length === 0 && <p>No users yet.</p>}
        {users.map((user, index) => (
          <li
            key={index}
            className="border p-3 rounded flex items-center justify-between"
          >
            <div>
              <p>
                <strong>{user.firstname} {user.lastname}</strong> ({user.age} years)
              </p>
              <p>Hobbies: {user.hobbies.join(', ') || 'None'}</p>
            </div>
            <button
              onClick={() => deleteUser(index)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold">Add New User</h2>

        <input
          type="text"
          placeholder="Firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="border p-2 w-full mt-2"
        />
        <input
          type="text"
          placeholder="Lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="border p-2 w-full mt-2"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="border p-2 w-full mt-2"
        />

        <div className="mt-3 space-y-1">
          <p className="font-medium">Select Hobbies:</p>
          {hobbiesOptions.map((hobby) => (
            <label key={hobby} className="block">
              <input
                type="checkbox"
                checked={selectedHobbies.includes(hobby)}
                onChange={() => handleHobbyChange(hobby)}
                className="mr-2"
              />
              {hobby}
            </label>
          ))}
        </div>

        <button
          onClick={handleAddUser}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default User;
