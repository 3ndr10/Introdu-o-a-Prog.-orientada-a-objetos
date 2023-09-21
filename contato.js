export class Contato {

nome;
email;
telefone;
endereco;
cpf;
dataNascimento;

constructor(nome, email, telefone, endereco, cpf, dataNascimento) {
    this.nome = nome.toUpperCase();
    this.email = email.toUpperCase();
    this.endereco = endereco.toUpperCase();
    this.telefone = telefone;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
}

}