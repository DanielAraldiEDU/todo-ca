import { Icon } from '../Icon';

export function EmptyState() {
  return (
    <div className='flex flex-col w-full justify-center items-center p-16 gap-5'>
      <Icon name='note-blank' size='xx-large' color='neutral' />

      <h3 className='text-2xl text-gray-200'>Sem Todo Cas ainda</h3>

      <p className='text-lg text-gray-200'>
        Comece adicionando o seu primeiro Todo Ca!
      </p>
    </div>
  );
}
