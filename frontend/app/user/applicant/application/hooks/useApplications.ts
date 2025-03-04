'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Application } from '@/types/application';

export function useApplications() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/application/all`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                        },
                    }
                );
                setApplications(response.data.applications);
            } catch (err) {
                setError('Failed to fetch applications');
                console.error('Error fetching applications:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchApplications();
    }, []);

    return { applications, isLoading, error };
}