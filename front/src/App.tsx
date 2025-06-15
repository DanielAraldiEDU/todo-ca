import { Divider, TodoCard } from './components';

function App() {
  return (
    <main className='flex flex-col w-full h-screen items-center p-16 overflow-y-auto'>
      <div className='flex flex-col w-full max-w-4xl gap-8'>
        <TodoCard variant='add' />

        <Divider />
      </div>
    </main>
  );
}

export default App;
