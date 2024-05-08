import './assets/sass/app.scss';
import Grid from './components/Grid.tsx';

function App() {

  return (
    <div className='app'>
      <h1>hello</h1>
      <div className='flex justify-center w-full'>
        <Grid />
      </div>
    </div>
  )
}

export default App
