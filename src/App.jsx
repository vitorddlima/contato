import { useState,useEffect } from 'react'

import './App.css'

function App() {

    const [cep, setCep] = useState("80510-070");
    const [bairro, setBairro] = useState("");
    const [rua, setRua] = useState("");
    const [estado, setEstado] = useState("");
    const [localidade, setLocalidade] = useState("");
  
  
    function handleCep(e) {
      setCep(e.target.value);
    }
  
    useEffect(() => {
      const sanitizedCep = cep.replace(/\D/g, "");
  
      if (sanitizedCep.length !== 8) return;
  
  
      fetch(`https://viacep.com.br/ws/${sanitizedCep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (data.erro) {
            console.warn("CEP não encontrado");
            return;
          }
  
          const { logradouro, localidade, bairro, estado } = data;
          setBairro(bairro)
          setRua(logradouro)
          setEstado(estado)
          setLocalidade(localidade)
  
        })
    }, [cep]);
    return (
      <>
        <br /><br /><br /><br />
        <h1>CONTATO</h1>
        <input type="text" placeholder="Insira o CEP" onChange={handleCep} /><br></br>
        <strong>BAIRRO:</strong>  {bairro} <br></br>  <strong>RUA:</strong>  {rua}<br></br>  <strong>ESTADO:</strong>  {estado} <br></br> <strong>CIDADE:</strong>  {localidade}
  
      </>
    );
  }
  

export default App;
