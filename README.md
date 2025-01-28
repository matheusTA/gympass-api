# App

Gympass style application, using the SOLID pattern concept

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuãrio logado
- [x] Deve ser possível obter o número de chack-ins realizados pelo usuário logado
- [x] Deve ser possível o usuário obter seu histórico de check-ins
- [x] Deve ser possível o usuário buscar academias próximas
- [x] Deve ser possível o usuário buscar uma academias pelo nome
- [x] Deve ser possível o usuário buscar realizar check-in em uma academia
- [x] Deve ser possível validar o check-in de um usuário
- [x] Deve ser possível cadastrar uma academia

## RNs (Regras de negócio)

- [x] O usuário não deve pode se cadastrar com um e-mail duplicado
- [x] O usuário não pode fazer dois check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [x] O check-in so pode ser validado 20 minutos após ser criado
- [x] O check-in so pode ser validado por administradores
- [x] A academia so pode ser cadastrada por administradores

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco postgreSQL
- [x] Todas as listas de dados precisam estar paginadas com 20 items por pagina
- [x] O usuario deve ser identificado por um JWT
