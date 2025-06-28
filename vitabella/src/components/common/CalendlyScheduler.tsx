"use client";
import React, { useState } from 'react';

interface CalendlySchedulerProps {
  type?: 'employees' | 'roundrobin';
}

const ROUNDROBIN_LINK = 'https://calendly.com/vb-consultations/complimentary-consults';

const CalendlyScheduler: React.FC<CalendlySchedulerProps> = ({ type = 'employees' }) => {
  if (type === 'roundrobin') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        <iframe
          src={ROUNDROBIN_LINK + '?hide_event_type_details=1&hide_gdpr_banner=1'}
          width="100%"
          height="700"
          frameBorder="0"
          title="Calendly Scheduler (Round Robin)"
          style={{ minWidth: '320px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
          allow="camera; microphone; fullscreen"
        ></iframe>
      </div>
    );
  }

  // Only import employees.json if not roundrobin
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const employees = require('../../constants/employees.json');
  const availableEmployees = employees.filter((e: any) => e.calendlystatus === 'Available');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = availableEmployees[selectedIdx];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', justifyContent: 'center' }}>
        {availableEmployees.map((emp: any, idx: number) => (
          <button
            key={emp.calendlylink}
            onClick={() => setSelectedIdx(idx)}
            style={{
              border: selectedIdx === idx ? '2px solid #012B27' : '1.5px solid #D6FEA1',
              background: selectedIdx === idx ? '#D6FEA1' : '#fff',
              color: '#012B27',
              borderRadius: '1.5rem',
              padding: '0.5rem 1.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              fontWeight: 700,
              fontFamily: 'Switzer, Arial, Helvetica, sans-serif',
              cursor: 'pointer',
              boxShadow: selectedIdx === idx ? '0 2px 8px rgba(44,60,50,0.07)' : 'none',
              transition: 'all 0.15s',
            }}
          >
            <img src={emp.image} alt={emp.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
            <span>{emp.name}</span>
          </button>
        ))}
      </div>
      <iframe
        src={selected.calendlylink + '?hide_event_type_details=1&hide_gdpr_banner=1'}
        width="100%"
        height="700"
        frameBorder="0"
        title={`Calendly Scheduler for ${selected.name}`}
        style={{ minWidth: '320px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
        allow="camera; microphone; fullscreen"
      ></iframe>
    </div>
  );
};

export default CalendlyScheduler;
