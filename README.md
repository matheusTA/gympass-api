# App

Gympass style application, using the SOLID pattern concept

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar
- [ ] Deve ser possível se autenticar
- [ ] Deve ser possível obter o perfil de um usuãrio logado
- [ ] Deve ser possível obter o número de chack-ins realizados pelo usuário logado
- [ ] Deve ser possível o usuário obter seu histórico de check-ins
- [ ] Deve ser possível o usuário buscar academias próximas
- [ ] Deve ser possível o usuário buscar uma academias pelo nome
- [ ] Deve ser possível o usuário buscar realizar check-in em uma academia
- [ ] Deve ser possível validar o check-in de um usuário
- [ ] Deve ser possível cadastrar uma academia

## RNs (Regras de negócio)

- [ ] O usuário não deve pode se cadastrar com um e-mail duplicado
- [ ] O usuário não pode fazer dois check-ins no mesmo dia
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [ ] O check-in so pode ser validado 20 minutos após ser criado
- [ ] O check-in so pode ser validado por administradores
- [ ] A academia so pode ser cadastrada por administradores

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada
- [ ] Os dados da aplicação precisam estar persistidos em um banco postgreSQL
- [ ] Todas as listas de dados precisam estar paginadas com 20 items por pagina
- [ ] O usuario deve ser identificado por um JWT
