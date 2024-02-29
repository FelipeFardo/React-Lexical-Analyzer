import { useAnalyzer } from "../context/useAnalyzer";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.string()
.toLowerCase()
.refine((value=> value.length>0),{message:'Enter a token'})
.refine(
  (value) => /^[a-zA-Z]+$/.test(value), "Only letters are allowed, no spaces");


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
    if (tokens.includes(data.token)) return toast.error('This token already exists in the dictionary');
    insertToken(data.token);
    toast.success(data.token + ' has been added');
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
          <input type="submit" className="btn btn-dark w-100"  value="Add Token"/>
      </form>
    </>
  )
}


export default InputDictionary;