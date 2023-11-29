import { useEffect } from "react";
import { useAnalyzer } from "../context/useAnalyzer"; 

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

const Analyzer = () =>{
  // Desestruturação do estado e ações do contexto useAnalyzer
  const {state: {tokens, analyzer, tokenSearch}, actions: {setAnalyzer}}= useAnalyzer();
  
  // Geração da tabela com base no estado do alfabeto 
  const tableData =  analyzer.map((tableItem) => letters.map((letter) => tableItem[letter] || ''));

  // Variável para rastrear a linha atual durante a busca de tokens
  let currentRow = 0;
  
  // Efeito executado quando tokens mudam para atualizar o alfabeto
  useEffect(()=>{
    setAnalyzer();
  },[tokens, setAnalyzer])
 
  console.log("Analyzer:", analyzer)
  console.log("Table data:", tableData)
  // Função para verificar se um token é válido letra por letra
  const isValidToken = () => {
    if (tokenSearch.length === 1) {
      currentRow = 0;
      return tableData[0][tokenSearch.charCodeAt(0) - 'a'.charCodeAt(0)] !== '';
    }
    for (let i = 0; i < tokenSearch.length; i++) {
      const number = tokenSearch[i].charCodeAt(0) - 'a'.charCodeAt(0);
      if (tableData[currentRow][number] === '')  return false;
      if (i < tokenSearch.length - 1) currentRow = tableData[currentRow][number];
    }
    return true;
  };

  const valid = isValidToken();

    useEffect(() => {
      const scrollContainer = document.getElementById('table');

      if (currentRow<=1) document.getElementById('tabelacontainer').scrollTo({top: 0,behavior: 'smooth'});
  
      
      let linhaDesejada=scrollContainer.rows[currentRow];
      linhaDesejada.scrollIntoView({ behavior: 'smooth' });
  }, [currentRow]);
  // Renderização da tabela e estilização condicional com base nas condições
  return (
  <div className="table-wrapper-scroll-y my-custom-scrollbar" id="tabelacontainer" style={{height:370,overflow: "auto"}}>

    {/* Tabela que mostra as transições do AFD */}
    <table className="table table-bordered table-striped" id="table"  style={{fontSize:13}}>
    {/* Cabeçalho da tabela com as letras do alfabeto como colunas */}
    <thead className="sticky-top">
      <tr className="text-center ">
        {/* Estados */}
        <th scope="col" >δ</th>
        {/* Percorrer letras do alfabeto e renderizar o cabeçalho da tabela */}
        {letters.map((l)=>(<th key={l} scope="col">{l.toUpperCase()}</th>))}
      </tr>
      </thead>
      <tbody className="text-center">
        {/* Corpo da tabela contendo as transições entre os estados do AFD */}
         {tableData.map((row,rowIndex)=>(
          <tr
          key={rowIndex}
          className={`
          ${rowIndex === currentRow && tokenSearch && !valid
                ? 'bg-danger'
                : 'bg-transparent'}`}
              >
          {/* Célula representando o estado atual da linha */}
          <td>
            {`q${rowIndex}`}{analyzer[rowIndex].end === true ? `*` : ``}
          </td>
              {/* Mapeia cada célula da linha representando as transições e adiciona a classe de acordo com o token pesquisado */}
              {row.map((letra, letraIndex)=>(
                <td
                key={letraIndex}
                  className={`
                  ${rowIndex === currentRow &&
                    valid && letra &&
                    tokenSearch[tokenSearch.length - 1] === letters[letraIndex] 
                      ? 'bg-success'
                      : 'bg-transparent'
                  }`}
                  >
                    {/* Exibe o ponteiro da proxíma letra(próximo estado na célula), ou '-' se não houver transição */}
                    {letra ? `q${letra}` : '-'}
                  </td>
              ))}
          </tr>
        ))}  
      </tbody>
    </table>
  </div>
  )}

export default Analyzer;