
import { CiSearch } from "react-icons/ci";
import { useAnalyzer } from "../context/useAnalyzer";
import toast from "react-hot-toast";

const InputAnalyzer = () => {
  const {state: {tokenSearch, tokens}, actions: {setTokenSearch}}= useAnalyzer(); 


  function verifyToken(e){
    const token = e.replace(/\s/g, '');
    if (/\s/.test(e)){
      tokens.includes(token)
        ? toast.success(`O token ${token} é válido`, {duration:5000})
        : toast.error(`O token ${token} não é válido`, {duration:5000})
      setTokenSearch('');
      document.getElementById('tabelacontainer').scrollTo({top: 0,behavior: 'smooth'});
      return
    }
    if (/^[A-Za-z\s]*$/.test(token))setTokenSearch(token);
    else {
      toast.error("Digite um token válido")
      setTokenSearch('');
      document.getElementById('tabelacontainer').scrollTo({top: 0,behavior: 'smooth'});
    }
  }

  return (
    <div className="form-floating mb-2">
      <input
        type="text"
        className="form-control"
        id="wordSearch"
        value={tokenSearch}
        placeholder="token"
        onChange={(e)=>{
          verifyToken(e.target.value)
        }}
      />
      <label htmlFor="wordSearch"><CiSearch/> Analisar token  (espaço para confirmar) </label>
    </div>
  )
}

export default InputAnalyzer;