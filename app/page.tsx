"use client"

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEntryStore } from '../hooks/useEntryStore';
import { useEffect } from 'react';

export default function Page() {
    const router = useRouter();
    const { entry, updateFullName, updateReferenceUrl, updateId, updateIsLoading } =
        useEntryStore();
    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: { fullName: entry?.fullName, referenceUrl: entry?.referenceUrl },
    });
    const onSubmit = async (data: { [x: string]: any }) => {
        updateIsLoading(true);
        updateFullName(data.fullName);
        updateReferenceUrl(data.referenceUrl);

        // TODO : Create user in DB

        updateId(0);
        updateIsLoading(false);

        router.push('/editor');
    };

    useEffect(() => {
        if (entry?.id) {
            router.push('/editor');
        }
    }, [router, entry?.id]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Welcome!</h1>
                <h3>Please state your name 👇🏼</h3>
                <input
                    type='text'
                    placeholder='Name'
                    {...register('fullName', { required: true, max: 80, min: 5 })}
                />

                <h4>Reference URL (optional)</h4>
                <input
                    type='text'
                    placeholder='Reference URL'
                    {...register('referenceUrl', { required: false })}
                />
                <input type='submit' className='button' />
            </form>
        </>
    );
}
