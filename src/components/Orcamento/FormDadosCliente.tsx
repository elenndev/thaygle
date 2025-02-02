import { useState } from 'react';
import { TypeDadosCliente } from '../../types';

interface FormularioProps {
  handleResposta: (dados: TypeDadosCliente) => void;
}

const FormDadosCliente: React.FC<FormularioProps> = ({ handleResposta }) => {
  const [dadosCliente, setDadosCliente] = useState<TypeDadosCliente>({
    nome: '',
    endereco: '',
    cpf: '',
    telefone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(name == 'cpf'){
      let cpf = value.replace(/\D/g, '')
      if (cpf.length <= 3) {
        cpf = cpf.replace(/(\d{3})(\d*)/, '$1');
      } else if (cpf.length <= 6) {
        cpf = cpf.replace(/(\d{3})(\d{1,3})(\d*)/, '$1.$2');
      } else if (cpf.length <= 9) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d*)/, '$1.$2.$3');
      } else {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{1,2})(\d*)/, '$1.$2.$3-$4');
      }
      setDadosCliente((prevDados) => ({
        ...prevDados,
        [name]: cpf,
      }));

    } else{
      setDadosCliente((prevDados) => ({
        ...prevDados,
        [name]: value,
      }));
    }
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleResposta(dadosCliente);
  };

  return (
    <div className="max-w-lg absolute top-[2rem] mx-auto p-6 bg-white rounded-lg">
      <form onSubmit={handleSubmit}>
        <p className="w-full text-center text-gray-700">Por favor informe os dados a seguir para gerar o orçamento</p>
        <div className="mb-4">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            onChange={handleChange}
            minLength={2}
            className="mt-1 block w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Digite seu nome"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">Endereço</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={dadosCliente.endereco}
            onChange={handleChange}
            minLength={5}
            className="mt-1 block w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Digite seu endereço"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={dadosCliente.cpf}
            onChange={handleChange}
            minLength={14}
            maxLength={14}
            className="mt-1 block w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Digite seu CPF"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            value={dadosCliente.telefone}
            onChange={handleChange}
            minLength={9}
            maxLength={14}
            className="mt-1 block w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Digite seu telefone"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 px-4 py-2 bg-[--devScheme-softBlue] text-white font-semibold rounded-md hover:bg-[--devScheme-blue] focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Continuar
        </button>
      </form>
    </div>
  );
};

export default FormDadosCliente;
