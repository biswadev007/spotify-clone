import Header from '@/components/Header';
import ListItem from '@/components/ListItem';

const Home = () => {
  return (
    <div className='bg-neutral-900 rounded-lg overflow-y-auto h-full w-full overflow-hidden'>
      <Header>
        <div>
          <h1 className='text-white text-3xl font-semibold'>Welcome back</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
            <ListItem
              href='liked'
              image='/images/liked.png'
              name='Liked Music'
            />
          </div>
        </div>
      </Header>
      <div className='mt-2 mb-7 px-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-white font-semibold text-2xl'>
            Newest songs
          </h1>
        </div>
        <div>
          List of songs!
        </div>
      </div>
    </div>
  );
};

export default Home;
