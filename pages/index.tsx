import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useEntryStore } from '../hooks/useEntryStore';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const router = useRouter();
  const { entry, updateHandle, updateFullName, updateId, updateIsLoading } =
    useEntryStore();
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: { handle: entry?.handle, fullName: entry?.fullName },
  });
  const onSubmit = async (data: { [x: string]: any }) => {
    updateIsLoading(true);
    updateHandle(data.handle);
    updateFullName(data.fullName);

    // TODO : Create user in DB

    updateId(0);
    updateIsLoading(false);

    await router.push('/editor');
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
        <h3>Please state you handle and your name</h3>
        <input
          type='text'
          placeholder='Handle'
          {...register('handle', {
            required: true,
            max: 15,
            min: 3,
            maxLength: 15,
          })}
        />
        <input
          type='text'
          placeholder='Full name'
          {...register('fullName', { required: true, max: 80, min: 5 })}
        />

        <input type='submit' className='button' />
      </form>
    </>
  );
};

export default Home;
