import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { useAnalyzer } from '../context/useAnalyzer';

const Tags = ()=>{
  const {state: {tokens, tokenSearch}} = useAnalyzer();

  const tags = tokens.filter((element) => element.startsWith(tokenSearch))
  return (
  <div style={{marginLeft:'5px'}}>
    {tags.length>0 ?
      <>
        <p>Suggestions</p>
        <Stack direction="horizontal" gap={2}>
        {tags.map((e)=>(
          <Badge pill className="mb-3" bg="dark" key={e}>{e}</Badge>
        ))}
        </Stack>
      </>
      :
      <p>No suggestions</p>}
  </div>
  )
}

export default Tags;