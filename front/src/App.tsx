import { useMemo } from 'react';
import { Divider, EmptyState, Spinner, TodoCard } from './components';
import { useListTodos } from './services';

function App() {
  const { data, isLoading } = useListTodos();

  const renderTodos = useMemo(
    () =>
      isLoading ? (
        <div className='flex w-full h-96 justify-center items-center'>
          <Spinner color='secondary' size='large' />
        </div>
      ) : (
        <>
          {data && data.length > 0 ? (
            data.map(todo => (
              <TodoCard variant='edit' key={todo.id} {...todo} />
            ))
          ) : (
            <EmptyState />
          )}
        </>
      ),
    [data, isLoading]
  );

  return (
    <main className='flex flex-col w-full h-screen items-center p-16 overflow-y-auto'>
      <div className='flex flex-col w-full max-w-4xl gap-8'>
        <TodoCard variant='add' />

        <Divider />

        {renderTodos}
      </div>
    </main>
  );
}

export default App;
