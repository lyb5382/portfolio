import React, { useState } from 'react'
import { api } from '../lib/api'
import { Navigate } from 'react-router-dom';

export default function RequierAuth({ Component }) {
    const [ok, setOk] = useState(null)
    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                await api.post('/api/auth/verify-token', {})
                if (alive) setOk(true)
            } catch (error) {
                if (alive) setOk(false)
            }
        })()
        return () => { alive = false }
    }, [])

    return ok ? <Component /> : <Navigate to='/admin/login' replace />
}

