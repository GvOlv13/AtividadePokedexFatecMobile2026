export interface loginProps {
    name: string;
    senha: string;
    setNome: (text: string) => void;
    setSenha: (text: string) => void;
    handleLogin: () => void;
}