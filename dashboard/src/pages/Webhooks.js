import React, { useState, useEffect } from 'react';

function Webhooks() {
    const [webhookUrl, setWebhookUrl] = useState('https://yoursite.com/webhook');
    const [webhookSecret, setWebhookSecret] = useState('whsec_test_abc123');
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const API_KEY = 'key_test_abc123';
    const API_SECRET = 'secret_test_xyz789';

    // Fetch webhook logs on component mount
    useEffect(() => {
        fetchWebhookLogs();
    }, []);

    const fetchWebhookLogs = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/v1/webhooks?limit=10&offset=0`, {
                headers: {
                    'X-Api-Key': API_KEY,
                    'X-Api-Secret': API_SECRET
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch webhook logs');
            }

            const data = await response.json();
            setLogs(data.data || []);
        } catch (error) {
            console.error('Error fetching webhook logs:', error);
            setMessage('Error fetching webhook logs');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveConfiguration = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/v1/webhooks/config`, {
                method: 'PUT',
                headers: {
                    'X-Api-Key': API_KEY,
                    'X-Api-Secret': API_SECRET,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ webhook_url: webhookUrl })
            });

            if (!response.ok) {
                throw new Error('Failed to save configuration');
            }

            setMessage('✅ Webhook configuration saved successfully');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving configuration:', error);
            setMessage('❌ Error saving configuration');
        } finally {
            setLoading(false);
        }
    };

    const handleSendTestWebhook = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/v1/webhooks/test`, {
                method: 'POST',
                headers: {
                    'X-Api-Key': API_KEY,
                    'X-Api-Secret': API_SECRET
                }
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.description || 'Failed to send test webhook');
            }

            setMessage('✅ Test webhook sent successfully');
            setTimeout(() => {
                setMessage('');
                fetchWebhookLogs();
            }, 2000);
        } catch (error) {
            console.error('Error sending test webhook:', error);
            setMessage(`❌ ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleRegenerateSecret = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/v1/webhooks/secret/regenerate`, {
                method: 'POST',
                headers: {
                    'X-Api-Key': API_KEY,
                    'X-Api-Secret': API_SECRET
                }
            });

            if (!response.ok) {
                throw new Error('Failed to regenerate secret');
            }

            const data = await response.json();
            setWebhookSecret(data.webhook_secret);
            setMessage('✅ Webhook secret regenerated');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error regenerating secret:', error);
            setMessage('❌ Error regenerating secret');
        } finally {
            setLoading(false);
        }
    };

    const handleRetryWebhook = async (webhookId) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/v1/webhooks/${webhookId}/retry`, {
                method: 'POST',
                headers: {
                    'X-Api-Key': API_KEY,
                    'X-Api-Secret': API_SECRET
                }
            });

            if (!response.ok) {
                throw new Error('Failed to retry webhook');
            }

            setMessage('✅ Webhook retry scheduled');
            setTimeout(() => {
                setMessage('');
                fetchWebhookLogs();
            }, 2000);
        } catch (error) {
            console.error('Error retrying webhook:', error);
            setMessage('❌ Error retrying webhook');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <div data-test-id="webhook-config" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ color: '#ffffff', marginBottom: '20px' }}>Webhook Configuration</h2>

            {message && (
                <div style={{
                    padding: '12px',
                    marginBottom: '20px',
                    borderRadius: '8px',
                    background: message.includes('✅') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: message.includes('✅') ? '#6ee7b7' : '#fca5a5',
                    border: `1px solid ${message.includes('✅') ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                    backdropFilter: 'blur(10px)'
                }}>
                    {message}
                </div>
            )}

            <form data-test-id="webhook-config-form" onSubmit={(e) => { e.preventDefault(); handleSaveConfiguration(); }} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                marginBottom: '30px'
            }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.9)' }}>
                        Webhook URL
                    </label>
                    <input
                        data-test-id="webhook-url-input"
                        type="url"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        placeholder="https://yoursite.com/webhook"
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            color: '#ffffff',
                            outline: 'none'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.9)' }}>
                        Webhook Secret
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <span
                            data-test-id="webhook-secret"
                            style={{
                                flex: 1,
                                padding: '12px 16px',
                                background: 'rgba(255, 255, 255, 0.08)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                borderRadius: '8px',
                                fontFamily: 'monospace',
                                fontSize: '14px',
                                color: '#ffffff'
                            }}
                        >
                            {webhookSecret}
                        </span>
                        <button
                            data-test-id="regenerate-secret-button"
                            type="button"
                            onClick={handleRegenerateSecret}
                            disabled={loading}
                            style={{
                                padding: '12px 20px',
                                background: 'rgba(107, 114, 128, 0.6)',
                                color: 'white',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            Regenerate
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        data-test-id="save-webhook-button"
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '12px 24px',
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
                        }}
                    >
                        {loading ? 'Saving...' : 'Save Configuration'}
                    </button>

                    <button
                        data-test-id="test-webhook-button"
                        type="button"
                        onClick={handleSendTestWebhook}
                        disabled={loading}
                        style={{
                            padding: '12px 24px',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                        }}
                    >
                        {loading ? 'Sending...' : 'Send Test Webhook'}
                    </button>
                </div>
            </form>

            <h3 style={{ color: '#ffffff', marginBottom: '15px' }}>Webhook Logs</h3>
            <div style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                backdropFilter: 'blur(20px)',
                borderRadius: '16px', 
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)', 
                overflow: 'hidden' 
            }}>
                <table data-test-id="webhook-logs-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255, 255, 255, 0.08)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <th style={{ padding: '14px', textAlign: 'left', fontWeight: '600', color: '#ffffff' }}>Event</th>
                            <th style={{ padding: '14px', textAlign: 'left', fontWeight: '600', color: '#ffffff' }}>Status</th>
                            <th style={{ padding: '14px', textAlign: 'left', fontWeight: '600', color: '#ffffff' }}>Attempts</th>
                            <th style={{ padding: '14px', textAlign: 'left', fontWeight: '600', color: '#ffffff' }}>Last Attempt</th>
                            <th style={{ padding: '14px', textAlign: 'left', fontWeight: '600', color: '#ffffff' }}>Response Code</th>
                            <th style={{ padding: '14px', textAlign: 'left', fontWeight: '600', color: '#ffffff' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)' }}>
                                    {loading ? 'Loading...' : 'No webhook logs yet'}
                                </td>
                            </tr>
                        ) : (
                            logs.map((log) => (
                                <tr
                                    key={log.id}
                                    data-test-id="webhook-log-item"
                                    data-webhook-id={log.id}
                                    style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}
                                >
                                    <td data-test-id="webhook-event" style={{ padding: '14px', color: '#ffffff' }}>{log.event}</td>
                                    <td data-test-id="webhook-status" style={{ padding: '14px' }}>
                                        <span style={{
                                            padding: '6px 12px',
                                            borderRadius: '6px',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            background: log.status === 'success' ? 'rgba(16, 185, 129, 0.2)' : log.status === 'failed' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                                            color: log.status === 'success' ? '#6ee7b7' : log.status === 'failed' ? '#fca5a5' : '#fcd34d',
                                            border: `1px solid ${log.status === 'success' ? 'rgba(16, 185, 129, 0.3)' : log.status === 'failed' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                                        }}>
                                            {log.status}
                                        </span>
                                    </td>
                                    <td data-test-id="webhook-attempts" style={{ padding: '14px', color: '#ffffff' }}>{log.attempts}</td>
                                    <td data-test-id="webhook-last-attempt" style={{ padding: '14px', color: 'rgba(255, 255, 255, 0.8)' }}>
                                        {formatDate(log.last_attempt_at)}
                                    </td>
                                    <td data-test-id="webhook-response-code" style={{ padding: '14px', color: '#ffffff' }}>
                                        {log.response_code || '-'}
                                    </td>
                                    <td style={{ padding: '14px' }}>
                                        <button
                                            data-test-id="retry-webhook-button"
                                            data-webhook-id={log.id}
                                            onClick={() => handleRetryWebhook(log.id)}
                                            disabled={loading}
                                            style={{
                                                padding: '8px 16px',
                                                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                                color: '#ffffff',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: loading ? 'not-allowed' : 'pointer',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                boxShadow: '0 2px 10px rgba(245, 158, 11, 0.3)'
                                            }}
                                        >
                                            Retry
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Webhooks;
