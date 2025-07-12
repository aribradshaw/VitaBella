"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface SessionStatus {
  status: string;
  payment_status: string;
  payment_intent_id?: string;
  payment_intent_status?: string;
}

export default function CheckoutReturn() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');
  const [sessionStatus, setSessionStatus] = useState<SessionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [iconColor, setIconColor] = useState('');
  const [icon, setIcon] = useState<React.ReactNode>(null);
  const [text, setText] = useState('');

  useEffect(() => {
    const SuccessIcon = (
      <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M15.4695 0.232963C15.8241 0.561287 15.8454 1.1149 15.5171 1.46949L6.14206 11.5945C5.97228 11.7778 5.73221 11.8799 5.48237 11.8748C5.23253 11.8698 4.99677 11.7582 4.83452 11.5681L0.459523 6.44311C0.145767 6.07557 0.18937 5.52327 0.556912 5.20951C0.924454 4.89575 1.47676 4.93936 1.79051 5.3069L5.52658 9.68343L14.233 0.280522C14.5613 -0.0740672 15.1149 -0.0953599 15.4695 0.232963Z" fill="white"/>
      </svg>
    );
    
    const ErrorIcon = (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M1.25628 1.25628C1.59799 0.914573 2.15201 0.914573 2.49372 1.25628L8 6.76256L13.5063 1.25628C13.848 0.914573 14.402 0.914573 14.7437 1.25628C15.0854 1.59799 15.0854 2.15201 14.7437 2.49372L9.23744 8L14.7437 13.5063C15.0854 13.848 15.0854 14.402 14.7437 14.7437C14.402 15.0854 13.848 15.0854 13.5063 14.7437L8 9.23744L2.49372 14.7437C2.15201 15.0854 1.59799 15.0854 1.25628 14.7437C0.914573 14.402 0.914573 13.848 1.25628 13.5063L6.76256 8L1.25628 2.49372C0.914573 2.15201 0.914573 1.59799 1.25628 1.25628Z" fill="white"/>
      </svg>
    );

    if (!sessionId) {
      setError('No session ID found');
      setLoading(false);
      return;
    }

    const fetchSessionStatus = async () => {
      try {
        const response = await fetch(`/api/checkout-session?session_id=${sessionId}`);
        
        if (!response.ok) {
          throw new Error('Failed to retrieve session status');
        }

        const data = await response.json();
        setSessionStatus(data);

        if (data.status === 'complete') {
          setIconColor('#30B130');
          setIcon(SuccessIcon);
          setText('Payment succeeded');
        } else {
          setIconColor('#DF1B41');
          setIcon(ErrorIcon);
          setText('Something went wrong, please try again.');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setIconColor('#DF1B41');
        setIcon(ErrorIcon);
        setText('Something went wrong, please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSessionStatus();
  }, [sessionId]);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f6f8fa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #0570de',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p>Loading payment status...</p>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f6f8fa',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '40px',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div 
          id="status-icon" 
          style={{
            backgroundColor: iconColor,
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}
        >
          {icon}
        </div>
        
        <h2 id="status-text" style={{ 
          marginBottom: '32px',
          fontSize: '24px',
          color: '#333'
        }}>
          {text}
        </h2>
        
        {sessionStatus && (
          <div id="details-table" style={{ marginBottom: '32px' }}>
            <table style={{ 
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px'
            }}>
              <tbody>
                <tr>
                  <td style={{ 
                    textAlign: 'left', 
                    padding: '8px', 
                    fontWeight: 'bold',
                    borderBottom: '1px solid #eee'
                  }}>
                    Payment Intent ID
                  </td>
                  <td style={{ 
                    textAlign: 'right', 
                    padding: '8px',
                    borderBottom: '1px solid #eee'
                  }}>
                    {sessionStatus.payment_intent_id || 'N/A'}
                  </td>
                </tr>
                <tr>
                  <td style={{ 
                    textAlign: 'left', 
                    padding: '8px', 
                    fontWeight: 'bold',
                    borderBottom: '1px solid #eee'
                  }}>
                    Status
                  </td>
                  <td style={{ 
                    textAlign: 'right', 
                    padding: '8px',
                    borderBottom: '1px solid #eee'
                  }}>
                    {sessionStatus.status}
                  </td>
                </tr>
                <tr>
                  <td style={{ 
                    textAlign: 'left', 
                    padding: '8px', 
                    fontWeight: 'bold',
                    borderBottom: '1px solid #eee'
                  }}>
                    Payment Status
                  </td>
                  <td style={{ 
                    textAlign: 'right', 
                    padding: '8px',
                    borderBottom: '1px solid #eee'
                  }}>
                    {sessionStatus.payment_status}
                  </td>
                </tr>
                <tr>
                  <td style={{ 
                    textAlign: 'left', 
                    padding: '8px', 
                    fontWeight: 'bold'
                  }}>
                    Payment Intent Status
                  </td>
                  <td style={{ 
                    textAlign: 'right', 
                    padding: '8px'
                  }}>
                    {sessionStatus.payment_intent_status || 'N/A'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        
        {sessionStatus?.payment_intent_id && (
          <a 
            href={`https://dashboard.stripe.com/payments/${sessionStatus.payment_intent_id}`} 
            id="view-details" 
            rel="noopener noreferrer" 
            target="_blank"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#0055DE',
              textDecoration: 'none',
              fontSize: '14px',
              marginBottom: '16px'
            }}
          >
            View details
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.125 3.49998C2.64175 3.49998 2.25 3.89173 2.25 4.37498V11.375C2.25 11.8582 2.64175 12.25 3.125 12.25H10.125C10.6082 12.25 11 11.8582 11 11.375V9.62498C11 9.14173 11.3918 8.74998 11.875 8.74998C12.3582 8.74998 12.75 9.14173 12.75 9.62498V11.375C12.75 12.8247 11.5747 14 10.125 14H3.125C1.67525 14 0.5 12.8247 0.5 11.375V4.37498C0.5 2.92524 1.67525 1.74998 3.125 1.74998H4.875C5.35825 1.74998 5.75 2.14173 5.75 2.62498C5.75 3.10823 5.35825 3.49998 4.875 3.49998H3.125Z" fill="#0055DE"/>            
              <path d="M8.66672 0C8.18347 0 7.79172 0.391751 7.79172 0.875C7.79172 1.35825 8.18347 1.75 8.66672 1.75H11.5126L4.83967 8.42295C4.49796 8.76466 4.49796 9.31868 4.83967 9.66039C5.18138 10.0021 5.7354 10.0021 6.07711 9.66039L12.7501 2.98744V5.83333C12.7501 6.31658 13.1418 6.70833 13.6251 6.70833C14.1083 6.70833 14.5001 6.31658 14.5001 5.83333V0.875C14.5001 0.391751 14.1083 0 13.6251 0H8.66672Z" fill="#0055DE"/>
            </svg>
          </a>
        )}
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link 
            href="/checkout"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#0570de',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Test another
          </Link>
          
          <Link 
            href="/"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: 'transparent',
              color: '#0570de',
              textDecoration: 'none',
              border: '1px solid #0570de',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
