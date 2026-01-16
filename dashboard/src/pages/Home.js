import React from 'react';

function Home() {
    return (
        <div className="container">
            <h1>Payment Gateway Dashboard</h1>

            <div className="card">
                <h2>🔐 Test Credentials</h2>
                <p style={{ marginBottom: '20px', opacity: 0.8 }}>Use these credentials for testing the payment gateway API.</p>
                <div className="form-group">
                    <label>API Key</label>
                    <input type="text" value="key_test_abc123" readOnly style={{ cursor: 'text' }} />
                </div>
                <div className="form-group">
                    <label>API Secret</label>
                    <input type="text" value="secret_test_xyz789" readOnly style={{ cursor: 'text' }} />
                </div>
            </div>

            <div className="card">
                <h2>🚀 Quick Start</h2>
                <p style={{ marginBottom: '15px' }}>Welcome to the Payment Gateway Dashboard. Use the navigation above to:</p>
                <ul style={{ marginLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                    <li>📡 Configure webhooks and view delivery logs</li>
                    <li>📚 Access API documentation and integration guides</li>
                </ul>
            </div>

            <div className="card">
                <h2>⚡ Service Status</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
                    <div style={{ padding: '15px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                        <div style={{ fontSize: '24px', marginBottom: '5px' }}>🟢</div>
                        <div style={{ fontWeight: '600' }}>API Server</div>
                        <div style={{ fontSize: '13px', opacity: '0.7' }}>Port 8000</div>
                    </div>
                    <div style={{ padding: '15px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                        <div style={{ fontSize: '24px', marginBottom: '5px' }}>🟢</div>
                        <div style={{ fontWeight: '600' }}>Worker Service</div>
                        <div style={{ fontSize: '13px', opacity: '0.7' }}>Bull Queue</div>
                    </div>
                    <div style={{ padding: '15px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                        <div style={{ fontSize: '24px', marginBottom: '5px' }}>🟢</div>
                        <div style={{ fontWeight: '600' }}>Database</div>
                        <div style={{ fontSize: '13px', opacity: '0.7' }}>PostgreSQL</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
