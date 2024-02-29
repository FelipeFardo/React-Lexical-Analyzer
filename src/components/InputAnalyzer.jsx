
import { CiSearch } from "react-icons/ci";
import { useAnalyzer } from "../context/useAnalyzer";
import toast from "react-hot-toast";

const InputAnalyzer = () => {
  const {state: {tokenSearch, tokens}, actions: {setTokenSearch}}= useAnalyzer(); 

  function verifyToken(e){
    const token = e.replace(/\s/g, '');
    if (/\s/.test(e)){
      tokens.includes(token)
        ? toast.success(`The token ${token} is valid`, {duration:5000})
        : toast.error(`The token ${token} is not valid`, {duration:5000})
      setTokenSearch('');
      document.getElementById('tablecontainer').scrollTo({top: 0,behavior: 'smooth'});
      return
    }
    if (/^[A-Za-z\s]*$/.test(token))setTokenSearch(token);
    else {
      toast.error("Enter a valid token")
      setTokenSearch('');
      document.getElementById('tablecontainer').scrollTo({top: 0,behavior: 'smooth'});
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
          verifyToken(e.target.value.toLowerCase())
        }}
      />
      <label htmlFor="wordSearch"><CiSearch/> Analyze token (space to confirm) </label>
    </div>
  )
}

export default InputAnalyzer;