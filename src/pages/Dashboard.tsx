import { Link } from 'react-router-dom';

const MY_BOARDS = [
    { id: 'project-alpha', name: 'Project Alpha' },
    { id: 'shopping-list', name: 'Groceries' },
    { id: 'brainstorm', name: 'App Ideas' }
]

export default function Dashboard() {
    return (
        <div style={{ padding: '40px', backgroundColor: '#1e1e1e', minHeight: '100vh', color: 'white' }}>
            <h1>My Workspace</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
                {MY_BOARDS.map((board) => (
                    <Link
                        key={board.id}  //Helps React identify which items changed, added, or removed
                        to={`/board/${board.id}`}
                        style={{
                            padding: '20px',
                            border: '1px solid #444',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            color: 'white',
                            backgroundColor: '#2d2d2d'
                        }}
                    >
                        <h3>{board.name}</h3>
                        {/*<p>View Canvas →</p>*/}
                    </Link>
                ))}
            </div>
        </div>
    );
}