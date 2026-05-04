import { useState, useEffect } from 'react'

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchUsers() {
        setLoading(true);
        try {
            const response = await fetch("https://api.freeapi.app/api/v1/public/randomusers")
            const data = await response.json();
            setUsers(data.data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <p className="badge" style={{ marginBottom: '0.5rem' }}>COMMUNITY</p>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Random Users</h1>
                    <p>Meet random users from around the world.</p>
                </div>
                <button onClick={fetchUsers}>
                    Refresh Users
                </button>
            </div>

            <div className="grid-container">
                {loading ? (
                    <div className="loading-text">Loading users...</div>
                ) : users && users.length > 0 ? (
                    users.map((user) => (
                        <div key={user.login?.uuid || user.id} className="neo-card" style={{ padding: 0 }}>
                            <div style={{ borderBottom: 'var(--border-width) solid var(--border-color)', height: '250px' }}>
                                <img
                                    src={user.picture?.large}
                                    alt={`${user.name?.first} ${user.name?.last}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                />
                            </div>
                            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', lineHeight: '1.2' }}>
                                        {user.name?.title} {user.name?.first} {user.name?.last}
                                    </h3>
                                    <span className="badge" style={{ background: 'var(--text-primary)' }}>
                                        {user.nat}
                                    </span>
                                </div>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>
                                    <p><strong>Age:</strong> {user.dob?.age}</p>
                                    <p><strong>Location:</strong> {user.location?.city}, {user.location?.country}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Phone:</strong> {user.phone}</p>
                                </div>
                                
                                <button style={{ width: '100%' }}>View Profile</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="neo-card">No users found.</div>
                )}
            </div>
        </div>
    )
}

export default Users