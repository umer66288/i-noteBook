import Notes from './Notes';

export default function Home(props) {
  const {showaleart} = props
  return (
    <div className='container mt-2'>
      <Notes showaleart={showaleart}/>
    </div>
  )
}