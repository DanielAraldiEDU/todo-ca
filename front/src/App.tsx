import { TodoCard } from './components';

function App() {
  return (
    <main className='flex flex-col w-full h-screen items-center p-16 overflow-y-auto'>
      <div className='flex flex-col w-full max-w-4xl gap-8'>
        <TodoCard variant='add' />

        {/* TODO: It should render a <Divider /> when there are todos */}

        {/* TODO: Add it when todos exists <TodoCard variant='edit' /> */}

        {/* TODO: Show <EmptyState /> when there are no todos */}
      </div>
    </main>
  );
}

export default App;
