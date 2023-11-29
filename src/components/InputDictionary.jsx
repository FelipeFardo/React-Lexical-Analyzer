import { useAnalyzer } from "../context/useAnalyzer";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.string()
.refine((value=> value.length>0),{message:'Digite um token'})
.refine(
  (value) => /^[a-zA-Z]+$/.test(value), "Apenas letras são permitidas, sem espaços");


const InputDictionary = ()=> {
  const {state: {tokens}, actions: {insertToken} } = useAnalyzer();

  const { register, handleSubmit, setValue } = useForm()

  const onSubmit = (data) => {
    try {
      schema.parse(data.token);
    } catch (error) {
      toast.error(error.issues[0].message);
      return
    }
    if (tokens.includes(data.token)) return toast.error('Esse token já existe no dicionário');
    insertToken(data.token);
    toast.success(data.token + ' foi adicionado!');
    setValue("token", "");
  }
  

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-floating mb-3">
          <input {...register("token")} name="token" id="token"
          className="form-control" placeholder=""/>
          <label for="floatingInput">Token</label>
        </div>
          <input type="submit" className="btn btn-dark w-100"  value="Adicionar"/>
      </form>
    </>
  )
}


export default InputDictionary;